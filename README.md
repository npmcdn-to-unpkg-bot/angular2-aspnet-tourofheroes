## angular2-aspnet-tourofheroes
This is the [Angular 2 Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/) tutorial as an [ASP.NET Core](http://docs.asp.net/en/latest/conceptual-overview/dotnetcore.html) web application 
specifically set up for use with [Visual Studio Code](https://code.visualstudio.com/docs).

### Setting up your environment
#### ASP.NET
This application is necessarily dependent on ASP.NET so see [ASP.NET Getting Started](http://docs.asp.net/en/latest/getting-started/index.html) for information regarding installation on your OS of choice 
(and a whole host of other useful articles including how to [Create an ASP.NET 5 web app in Visual Studio Code](http://docs.asp.net/en/latest/getting-started/index.html)).

#### Node and npm
If you haven't got an existing [Node.js](https://nodejs.org/en/download/) installation on your machine, you will have to install it. If you are completely new to Angular 2, you might want to run through the
[5 Min Quickstart](https://angular.io/docs/ts/latest/quickstart.html#).

### Getting Started
Fork or clone this repo or simply [download and extract the source](https://github.com/goblincoding/angular2-aspnet-tourofheroes/archive/master.zip).

At the command line (inside the root directory where your package.json file lives):
1. Run `npm install`
2. Run `dnu restore` (for the .NET dependencies)
3. Open the "angular2-aspnet-tourofheroes" folder in VS Code.
4. Open the command palette (F1) and type "dnx" next to the '>'. You should see te option for 'dnx: Run Command' (alternatively hit Ctrl+L, Shift+R).
5. Select 'dnx dev - (angular2-aspnet-tourofheroes) to launch the application through the Kestrel server.
6. Navigate to `http://localhost:5000` in your browser.
7. Rejoice!

Only the bare minimum is currently available in terms of gulp tasks, but worth noting is that the `gulp build.dev` task is tied to the VS Code build command through the 'Ctrl+Shift+B' shortcut (see tasks.json). 

If you wish to use Visual Studio, simply open the project.json file with your VS version and launch as you would usually.

### Roadmap
This repository is currently set up with the bare minimum to run the tutorial.  The intent is to expand this tutorial with tests, watch tasks, browser syncing, linting, etc.

### Help Welcome
I am still learning Angular 2 and ASP.NET Core, so help, guidance, advice and pull requests are always welcome!

#### References
[This blog post of David Pine](https://ievangelistblog.wordpress.com/2016/01/13/building-an-angular2-spa-with-asp-net-5-mvc-6-web-api-2-and-typescript-1-7-5/) contributed greatly to my understanding
of how an Angular 2/ASP.NET application can potentially be put together.

[Shane Boyer's Clean Shave](http://tattoocoder.azurewebsites.net/angular2-aspnet5-spa-template/) source was also a vital reference and most of the "good stuff" comes from there.

If you are interested in a solid modular seed repository (not ASP.NET though), see [Minko Gechev's Angular 2 Seed](https://github.com/mgechev/angular2-seed).
