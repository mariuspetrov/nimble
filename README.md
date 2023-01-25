# Nimble - The lightweight frontend framework.

Nimble is a web development framework that is designed to make building responsive and dynamic web applications quick and easy. 

Its lightweight nature allows for fast and efficient development, without compromising on functionality. With its custom folder structure and use of HTML, CSS, JavaScript and PHP, it provides a clear separation of concerns and makes it easy to maintain and scale projects as they grow. 

The framework comes with built-in support for popular tools and libraries, streamlining the development process and helping developers focus on creating great user experiences. Its ease of use makes it perfect for developers of all skill levels, from beginners to experts. 

With Nimble, developers can spend less time on setup and configuration and more time creating and implementing their ideas.

<br/>

## Quickstart guide

> To use this Git repository, follow these steps:
* Obtain a copy of the repository by either cloning or downloading it onto your computer
* Make sure you have Node.js installed on your computer. If not, you can download it from the official website (https://nodejs.org/en/)
* Use the command `npm install` to install the necessary dependencies
* Use the command `gulp bs` to run the tasks set up in the gulpfile.js and to automate the process of updating the browser 

<br/>

> Nimble uses Gulp to automate various development tasks. Specifically, it is configured to handle the following processes:

* Compiling SCSS files into CSS, this process is used to translate the SASS files into a format that can be understood by the web browsers.
* Autoprefixing and minifying CSS files, this step is used to ensure maximum browser compatibility and reduce the size of the CSS file, respectively.
* Concatenating multiple JavaScript files into one, this process allows to merge multiple JavaScript files into a single file which can improve the performance of the website.
* Uglifying JavaScript files, it is the process of minifying or shrinking the size of JavaScript files to improve the performance of the website.
* Finally, moving the final CSS and JS files to the /dist folder, this step is used to keep the final version of the files in a separate folder for production use.
* In addition to the aforementioned tasks, this project also utilizes the power of BrowserSync to automate the process of synchronizing the changes made in the project files with the browser. This is done by configuring Gulp to use BrowserSync, which allows for real-time updates on the browser without the need for manual refreshing. This improves the development workflow and saves time in testing and debugging.
