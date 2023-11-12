#!/usr/bin/env node

const { JSDOM } = require('jsdom');
const fs = require('fs');
const config = require('./config');
const openai = require('openai');

const oai_api_key = config.oai_api_key;

const oai = new openai({
    apiKey: oai_api_key
});

var arguments = process.argv;
const htmlpath = arguments[2];
const csspath = arguments[3];

const htmlContent = fs.readFileSync(htmlpath, 'utf-8');
const dom = new JSDOM(htmlContent);
const { window } = dom;
const $ = require('jquery')(window);

const elements = $('[class^="vision\\("]');

getAPIresponse();

async function getAPIresponse() {

    const classNames = elements.map(function() {
        const commaIndex = $(this).attr('class').indexOf(',', 7);
        return $(this).attr('class').slice(7, commaIndex);
    }).get();

    const responseInputs = elements.map(function() {
        const commaIndex = $(this).attr('class').indexOf(',', 7);
        return $(this).attr('class').slice(commaIndex + 1, -1);
    }).get();
    

    // console.log(classNames, responseInputs);

    let responseText = '';

    for (let i = 0; i < elements.length; i++) {
        const elem_typ = $(elements[i]).prop('tagName');
        //console.log(elem_typ);
        const originalClassName = $(elements[i]).attr('class');
        $(elements[i]).addClass(classNames[i]);
        $(elements[i]).removeClass(originalClassName);

        let input_string = `
        Write me CSS code for a ${elem_typ} element with the class name ${classNames[i]}.
        Do not include the type of the element in the CSS selector.
        This is what the style should be: ${responseInputs[i]}. 
        Include comments within the ${classNames[i]} selector, but not outside of the block.
        Include a comment in the first line of the selector that has this text: ${originalClassName}. 
        Return only code.
        `

        const chatCompletion = await oai.chat.completions.create({
            messages: [{ role: 'user', content: input_string}],
            model: 'gpt-3.5-turbo',
        });

        responseText = responseText + chatCompletion.choices[0].message.content;
        responseText = responseText + '\n\n';

    }

    const linkExists = $('head link#visioncss').length > 0;
    if (!linkExists) {
        const linkElement = $('<link>');
        linkElement.attr('id', 'visioncss');
        linkElement.attr('rel', 'stylesheet');
        linkElement.attr('href', `${csspath}`);
        $('head').append(linkElement);
    }

    const modifiedHTML = dom.serialize();
    fs.writeFileSync(htmlpath, modifiedHTML);
    fs.appendFileSync(csspath, responseText);
    console.log('Wait a minute, it actually worked. You\'re better than I thought.')
}