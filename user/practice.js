const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<!DOCTYPE html>
<html>
  <head>
    <title>Simple Header</title>
    <style>
      header {
        background-color: #333;
        padding: 1rem;
        color: white;
      }
      nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }
      nav a {
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
      nav a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>MyWebsite</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    <h1>Welcome to MyWebsite Home Page</h1>
  </body>
</html>`);
    return res.end(); 
  } else if (req.url === '/about') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<!DOCTYPE html>
<html>
  <head>
    <title>Simple Header</title>
    <style>
      header {
        background-color: #333;
        padding: 1rem;
        color: white;
      }
      nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }
      nav a {
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
      nav a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>MyWebsite</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    <h1>This is about Page</h1>
  </body>
</html>`);
  }
  else if (req.url === '/services') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<!DOCTYPE html>
<html>
  <head>
    <title>Simple Header</title>
    <style>
      header {
        background-color: #333;
        padding: 1rem;
        color: white;
      }
      nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }
      nav a {
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
      nav a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>MyWebsite</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    <h1>This is services Page</h1>
  </body>
</html>`);
  }
  else if(req.url==="/blog"){
    res.setHeader('Content-Type', 'text/html');
    res.write(`<!DOCTYPE html>
<html>
  <head>
    <title>Simple Header</title>
    <style>
      header {
        background-color: #333;
        padding: 1rem;
        color: white;
      }
      nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }
      nav a {
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
      nav a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>MyWebsite</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    <h1>This is Blogs Page</h1>
  </body>
</html>`);
  }
  else if(req.url==="/contact"){
    res.setHeader('Content-Type', 'text/html');
    res.write(`<!DOCTYPE html>
<html>
  <head>
    <title>Simple Header</title>
    <style>
      header {
        background-color: #333;
        padding: 1rem;
        color: white;
      }
      nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }
      nav a {
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
      nav a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>MyWebsite</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    <h1>This is Contact Page</h1>
  </body>
</html>`);
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.write('404 Not Found');
  }
});

const port = 3005;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
