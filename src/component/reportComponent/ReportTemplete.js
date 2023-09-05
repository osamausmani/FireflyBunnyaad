const htmlContent = `
<html>
  <head>
    <meta charset="utf-8">
    <title>report</title>
    <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
    <style>
      ${htmlStyles}
    </style>
  </head>
  <body>
    <header>
      <h1>BOQ FOR GREY STRUCTURE</h1>
      <heading>
      <h2>My Dream House</h2>
      <div>
      <P>Total Estimate</P>
      <P>120,000,000 PKR.</P>
      </div>
      </heading>
    </header>
    <article>
      <h1>Recipient</h1>
      <aside>
        <div>
        <p>city</p>
        <p>city</p>
        </div>
      </aside>
      
     
     
    </article>
    
  </body>
</html>
`;


const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}
h1,h2 { font: bold 100% sans-serif;
     letter-spacing: 0.1em; 
     text-align: center;
      text-transform: uppercase;
     }
/* table */
table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }
/* page */
html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }
body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }
/* header */
header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }
header h1 { border-radius: 0.25em;
     color: #000; 
     margin: 0 0 1em;
      padding: 0.5em 0; 
      font-size: 22px;
    }

header h2 { border-radius: 0.25em;
        color: #000; 
        margin: 0 0 1em;
         padding: 0.5em 0;
         font-size: 20px;
        }
header p {
    text-align: center;
    font-size: 22px;
    padding:5;
}

header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }
/* article */
article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }
article address { float: left; font-size: 125%; font-weight: bold; }
/* table meta & balance */
table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }
/* table meta */
table.meta th { width: 40%; }
table.meta td { width: 60%; }
/* table items */
table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }
table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }
/* table balance */
table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }
/* aside */
aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;