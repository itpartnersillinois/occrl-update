module.exports = (function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  var markdownIt = require("markdown-it")(options);
  var markdownItAttrs = require('markdown-it-attrs');

  markdownIt.use(markdownItAttrs, {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: []
  });
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setLibrary("md", markdownIt);
  eleventyConfig.addPassthroughCopy("winter24/img");
  eleventyConfig.addPassthroughCopy("script");

  eleventyConfig.addFilter("createMenu", function (title, menu) {
    if (title == '') {
      return '';
    }
    let returnValue = '';
    let counter = 0;
    let currentButtonAria = '';
    let currentUrl = '';
    menu.forEach(item => {
      let ariaCurrent = item.title === title || item.longtitle === title ? ' aria-current="page"' : '';
      if (item.title === title || item.longtitle === title) {
        currentUrl = item.url;
        currentButtonAria = `aria-controls="menu${(counter-1)}"`;
      }
      returnValue += `<li><a href="/${item.url}/index.html"${ariaCurrent}>${item.title}</a></li>`;
    });
    if (currentButtonAria != '') {
      returnValue = returnValue.replace(currentButtonAria, currentButtonAria + ' class="menu-button-active"');
    }
    // adding give and archive links
    returnValue += `<li class="line"><a class="menu-link" href="https://occrl.illinois.edu/">Office of Community College Research and Leadership</a></li>`;
    returnValue += `<li><a class="menu-link" href="https://occrl.illinois.edu/our-products/news">Past UPDATE on Research and Leadership issues</a></li>`;
    // adding print links
    returnValue += `<li class="line"><p class="menu-share">Share</p>`;
    returnValue += `<div class="menu-share-links">`;
    if (currentUrl == '') {
      returnValue += `<a aria-label="Share on email" title="Share on email" href="mailto:?subject=https://update.occrl.illinois.edu/" rel="external"><ilw-icon type="solid" icon="email" size="40px"></ilw-icon></a>`;
      returnValue += `<a aria-label="Share on Twitter" title="Share on Twitter" class="twitter" target="_blank" onclick="window.open(this.href,'_blank','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=400,top=500,left=500');return false;" href="https://twitter.com/share?url=https://update.occrl.illinois.edu/"><ilw-icon type="solid" icon="twitter" size="40px"></ilw-icon></a>`;
      returnValue += `<a aria-label="Share on Facebook" title="Share on Facebook" class="facebook" target="_blank" onclick="window.open(this.href,'_blank','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=400,top=500,left=500');return false;" href="https://www.facebook.com/sharer.php?u=https://update.occrl.illinois.edu/"><ilw-icon type="solid" icon="facebook" size="40px"></ilw-icon></a>`;
      returnValue += `<a aria-label="Share on LinkedIn" title="Share on LinkedIn" class="linkedin" target="_blank" onclick="window.open(this.href,'_blank','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=400,top=500,left=500');return false;" href="https://www.linkedin.com/sharing/share-offsite/?url=https://update.occrl.illinois.edu/"><ilw-icon type="solid" icon="linkedin" size="40px"></ilw-icon></a>`;
    } else {
      returnValue += `<a aria-label="Share on email" title="Share on email" href="mailto:?subject=https://update.occrl.illinois.edu/${currentUrl}/index.html" rel="external"><ilw-icon type="solid" icon="email" size="40px"></ilw-icon></a>`;
      returnValue += `<a aria-label="Share on Twitter" title="Share on Twitter" class="twitter" target="_blank" onclick="window.open(this.href,'_blank','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=400,top=500,left=500');return false;" href="https://twitter.com/share?url=https://update.occrl.illinois.edu/${currentUrl}/index.html"><ilw-icon type="solid" icon="twitter" size="40px"></a>`;
      returnValue += `<a aria-label="Share on Facebook" title="Share on Facebook" class="facebook" target="_blank" onclick="window.open(this.href,'_blank','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=400,top=500,left=500');return false;" href="https://www.facebook.com/sharer.php?u=https://update.occrl.illinois.edu/${currentUrl}/index.html"><ilw-icon type="solid" icon="facebook" size="40px"></ilw-icon></a>`;
      returnValue += `<a aria-label="Share on LinkedIn" title="Share on LinkedIn" class="linkedin" target="_blank" onclick="window.open(this.href,'_blank','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=400,top=500,left=500');return false;" href="https://www.linkedin.com/sharing/share-offsite/?url=https://update.occrl.illinois.edu/${currentUrl}/index.html"><ilw-icon type="solid" icon="linkedin" size="40px"></ilw-icon></a>`;
    }
    returnValue += `</div></li>`;

    return returnValue;
  });

  eleventyConfig.addFilter("transformArrows", function (title, menu) {
    if (title == '') {
      return '';
    }
    let returnValue = -1;
    let i = 0;
    menu.forEach(item => {
      if (item.title === title || item.longtitle === title) {
        returnValue = i;
      } 
      i++;
    });

    if (returnValue == -1) {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a class="next" href="/${menu[0].url}/index.html" class="next"><ilw-icon type="solid" icon="next" size="32px"></ilw-icon></a>
      </nav>`;
    } else if (returnValue == 0) {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a class="next" href="/${menu[1].url}/index.html" class="next"><ilw-icon type="solid" icon="next" size="32px"></ilw-icon></a>
      </nav>`;
    } else if (returnValue == menu.length - 1) {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a class="back" href="/${menu[menu.length - 2].url}/index.html"><ilw-icon type="solid" icon="back" size="32px"></ilw-icon></a>
      </nav>`;
    } else {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a class="back" href="/${menu[returnValue - 1].url}/index.html"><ilw-icon type="solid" icon="back" size="32px"></ilw-icon></a>
      <a class="next" href="/${menu[returnValue + 1].url}/index.html"><ilw-icon type="solid" icon="next" size="32px"></ilw-icon></a>
      </nav>`;
    }
  });
});
