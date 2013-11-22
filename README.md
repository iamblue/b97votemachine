Limitstyle_layout
=========
This is LimitStyle.com front-end. 


1. __Dev Url__:[click me](http://54.214.246.94)



##Usage

Open your client (Before you installing it, you must installed NodeJS) 

1. Install yeoman && grunt:

```bash
  npm install -g yo generator-angular grunt
```
  
2. Install package:

```bash
bower install
```  
&& 
```bash
npm install i
```
3. Run server:

```bash
grunt server
```  

4.look at : 
`http://127.0.0.1:9000`


##Architecture Intro

1. Write css at : `/app/styles`
2. Write stylus at : `/app/stylus`
3. Write js at : `/app/scripts`
4. Write ls at : `/app/src`
5. Nginx point to `/dist`
6. Test point to : `/test`

more info look at: `/Gruntfile.js`


##JS lib

1. Angular (v1.1.5) : [Document look here](http://angularjs.org/)
2. SectionJS : [Document look here](https://github.com/poying/sections.js)
3. Angular ui-router : [Document look here](https://github.com/angular-ui/ui-router)
4. Angular ngApi : [Document look here](https://github.com/iamblue/ngApi)



##Env Setting

1. Yeoman
2. Livescript 
3. stylus

Intial setting at [Here](https://github.com/YouMeb/limitstyle_layout/releases/tag/Init_Env_Setting)


##Tracking Issue 

1. Document: [Readmine](http://54.249.125.43/redmine/projects/limitstyle)
2. Code Issues: [Github Issue](https://github.com/YouMeb/limitstyle_layout/issues?state=open)



## License

(The MIT License)

Copyright (c) 2013 YouMeb and contributors.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
