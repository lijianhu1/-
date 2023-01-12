/**
 * <div id="app">hello {{msg}} <p></p></div> 解析成
 * ast 语法树
 */
/**
 * {
 *    tag: 'div',
 *    attrs: [{id:'app'}],
 *    children: [
 *        {tag: null, text:'hello', attr: []},
 *        {tag: 'p', attr: []},
 *    ]
 * }
 */
export function compileToFunction(el) {
  console.log('eeeel', el);
}
/* 解析模板的正则 */
//解析属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ 
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*` // 标签名 <span></span>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 标签开头正则，捕获的内容是标签名 '<' 开发
const startTagClose = /^\s*(\/?)>/ // 匹配标签的结束
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 结束标签
const doctype = /^<!DOCTYPE [^>]+>/i
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{}}

// 遍历html字符串，遍历一个删除一个 
function parseHTML(html) {
  while (html) {
    // 判断是否标签<>
    let textEnd = html.indexOf('<')
    if (textEnd === 0) {
      // 1. 开始标签
    }
    break;
  }
}