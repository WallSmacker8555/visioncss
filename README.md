<h1 align='center'>VisionCSS</h1>

<h5 align='center'>See your style.</h5>

![VisionCSS logo](./img/vision_logo.svg)

## Inspiration

CSS can be really difficult, especially for beginners. You think you're doing one thing, but you end up doing something completely different. It can be difficult to debug and, oftentimes, you end up writing CSS that never gets used, leading to unnecessary overhead. I aimed to simplify the process of writing CSS by making it more natural and accessible to beginners.

## What it does

VisionCSS allows users to write class names for HTML elements that have "functions." By formatting their class names in the following way: 'vision(className, desiredStyle)' the user can generate styles for a desired element using only natural language as input.

## How to use VisionCSS

In order to use VisionCSS you will need a key for the OpenAI API.

```
npm init -y
npm install visioncss
```

Once you've installed VisionCSS, you will need to set the path to your environment variables in the VisionCSS config.js file. The environment variables are where you should keep your OpenAI API key.

Once you've setup your OpenAI API key, create a src directory in the root of your project and create an HTML file.

```
mkdir src
cd src
touch index.html
```

Write some boilerplate HTML and add elements that use the vision function in their class name as shown below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="vision(madhacks, red with black border)">Wisconsin</button>
    <h1 class="vision(computer, blue in center)">Badgers</h1>
</body>
</html>
```

Now, you can run either of these commands to generate you CSS:

```
npx visioncss ./index.html ./build.css
npx vision ./index.html ./build.css
```

Your new build.css file that is generated could look like this:

```css
.madhacks {
    /* vision(madhacks, red with black border) */
    background-color: red;
    border: 1px solid black;
  }

.computer {
  /* vision(computer, blue in center) */
  color: blue;
  text-align: center;
}
```

Your HTML file will look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link id="visioncss" rel="stylesheet" href="./build.css">
</head>
<body>
    <button class="madhacks">Wisconsin</button>
    <h1 class="computer">Badgers</h1>
</body>
</html>
```

## What's next for VisionCSS

#### UTILITY CLASS CONVERSION

I want to extend the capability of VisionCSS so that it can convert vision functions into utility classes like Tailwind CSS.

#### COMMENT GENERATION

To enhance the user's understanding of the styles that are being generated for them, I seek to include comments within the CSS style selectors that describe what effect each style has.
