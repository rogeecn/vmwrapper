// file: tools/memory.js
global.catvm = {}
catvm.memory = {
  config: { print: false, proxy: false },
}
catvm.memory.htmlElements = {

}
catvm.memory.listeners = {}
catvm.memory.PluginArray = {}

// file: tools/safefunction.js
; (() => {
  'use strict';
  const $toString = Function.toString
  const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)))
  const myToString = function () {
    return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this)
  }
  function set_native(func, key, value) {
    Object.defineProperty(func, key, {
      "enumerable": false,
      'configurable': true,
      'writable': true,
      'value': value
    })
  }
  delete Function.prototype['toString']
  set_native(Function.prototype, 'toString', myToString)
  set_native(Function.prototype.toString, myFunction_toString_symbol, 'function toString(){ [native code] }')
  catvm.safefunction = (func) => {
    set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol, func.name || ''}() { [native code] }`)
  }
}).call(this);

// file: tools/print.js
catvm.print = {}
catvm.memory.print = []
catvm.print.log = function () {

}
catvm.print.getall = function () {

}

// file: tools/proxy.js
catvm.proxy = function (o) {
  if (catvm.memory.config.proxy == false) { return o }
  return new Proxy(o, {
    set(target, key, value) {
      console.log('set', target, key, value);
      return Reflect.set(...arguments);
    },
    get(target, key, receiver) {
      console.log('get', target, key, target[key]);
      return target[key];
    },
    deleteProperty: function (target, key) {
      console.log('delete', target, key);
      return true
    }
  });

}


// vm options
catvm.memory.config.print  = true
catvm.memory.config.proxy  = true

// file: browser/eventTarget.js
const EventTarget =function EventTarget()
{

}
catvm.safefunction(EventTarget);

Object.defineProperties(EventTarget.prototype,{
    [Symbol.toStringTag]:{
        value:'EventTarget',
        configurable:true,
    }
})
EventTarget.prototype.addEventListener = function addEventListener(type,callback){
    if(!(type in catvm.memory.listeners)){
        catvm.memory.listeners[type] = []
    }
    catvm.memory.listeners[type].push(callback)
}
catvm.safefunction(EventTarget.prototype.addEventListener);
EventTarget.prototype.dispatchEvent = function dispatchEvent(){

}
catvm.safefunction(EventTarget.prototype.dispatchEvent);
EventTarget.prototype.removeEventListener = function removeEventListener(){

}
catvm.safefunction(EventTarget.prototype.removeEventListener);
// file: browser/windowProperties.js
const windowProperties = function windowProperties() {

}
catvm.safefunction(windowProperties);

Object.defineProperties(windowProperties.prototype, {
  [Symbol.toStringTag]: {
    value: 'windowProperties',
    configurable: true,
  }
})
windowProperties.prototype.__proto__ = EventTarget.prototype;

// file: browser/window.js
let window = global

const Window = function Window() {
  throw new TypeError('Illegal constructor')
}
catvm.safefunction(Window);

window, setTimeout = function setTimeout(callback, delay) {
  typeof (callback) === 'function' ? callback() : undefined
  typeof (callback) === 'string' ? eval(callback) : undefined
  return 0
}
catvm.safefunction(window.setTimeout);
Window.prototype.PERSISTENT = 1
Window.prototype.TEMPORARY = 0
window.open = function open() { }
window.chrome = catvm.proxy(class chrome { })
window.DeviceOrientationEvent = function DeviceOrientationEvent() { }
window.DeviceMotionEvent = function DeviceMotionEvent() { }
catvm.safefunction(window.open);
catvm.safefunction(window.DeviceOrientationEvent);
catvm.safefunction(window.DeviceMotionEvent);

window.localStorage = class localStorage { }
window.localStorage.getItem = function getItem() { }
window.localStorage.setItem = function getItem() { }
catvm.safefunction(window.localStorage.getItem);
catvm.safefunction(window.localStorage.setItem);
catvm.proxy(window.localStorage)
Window.prototype.__proto__ = windowProperties.prototype;
window.__proto__ = Window.prototype

Object.defineProperties(Window.prototype, {
  [Symbol.toStringTag]: {
    value: 'Window',
    configurable: true,
  }
})

window = catvm.proxy(window)

// file: browser/location.js
const Location = function Location() {
  throw new TypeError('Illegal constructor')
}
catvm.safefunction(Location);

Object.defineProperties(Location.prototype, {
  [Symbol.toStringTag]: {
    value: 'Location',
    configurable: true,
  }
})

let location = {}
location.__proto__ = Location.prototype
location.href = ''

location = catvm.proxy(location)

// file: browser/navigator.js
const Navigator = function Navigator() {
  throw new TypeError('Illegal constructor')
}
catvm.safefunction(Navigator);

Object.defineProperties(Navigator.prototype, {
  [Symbol.toStringTag]: {
    value: 'Navigator',
    configurable: true,
  }
})
Object.getOwnPropertyDescriptor_ = Object.getOwnPropertyDescriptor;
Object.getOwnPropertyDescriptor = function (tag, val) {
  // tag[Symbol.toStringtag]
  if (tag.toLocaleString() == '[object Navigator]') {
    return undefined;
  }
  return Object.getOwnPropertyDescriptor_.apply(this, arguments)
}

Navigator.prototype.plugins = []
Navigator.prototype.language = ['zh-CN', 'zh']
Navigator.prototype.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'

let navigator = {}
navigator.__proto__ = Navigator.prototype
for (let prototype_ in Navigator.prototype) {
  navigator[prototype_] = Navigator.prototype[prototype_]
  Navigator.prototype.__defineGetter__(prototype_, function () {
    throw new TypeError('Illegal constructor')
  })

}

navigator = catvm.proxy(navigator)

// file: browser/history.js
const History = function History() {
  throw new TypeError('Illegal constructor')
}
catvm.safefunction(History);

Object.defineProperties(History.prototype, {
  [Symbol.toStringTag]: {
    value: 'History',
    configurable: true,
  }
})
History.prototype.back = function back() { }
catvm.safefunction(History.prototype.back);

let history = {}
history.__proto__ = History.prototype

history = catvm.proxy(history)

// file: browser/screen.js
const Screen = function Screen() {
  throw new TypeError('Illegal constructor')
}
catvm.safefunction(Screen);

Object.defineProperties(Screen.prototype, {
  [Symbol.toStringTag]: {
    value: 'Screen',
    configurable: true,
  }
})

let screen = {}
screen.__proto__ = Screen.prototype

screen = catvm.proxy(screen)

// file: browser/storage.js
const Storage = function Storage() {
  throw new TypeError('Illegal constructor')
}
catvm.safefunction(Storage);

Object.defineProperties(Storage.prototype, {
  [Symbol.toStringTag]: {
    value: 'Storage',
    configurable: true,
  }
})

Storage.prototype.length = 0;
Storage.prototype.clear = function clear() {
  debugger
  let temp = Object.keys(this)
  for (let key = 0; key < temp.length; key++) {
    delete this[key]
  }
}; catvm.safefunction(Storage.prototype.clear);
Storage.prototype.getItem = function getItem(k) {
  debugger
  return this[k]
  return
}; catvm.safefunction(Storage.prototype.getItem);
Storage.prototype.key = function key() {
  debugger
  return Object.keys(this)[index]
}; catvm.safefunction(Storage.prototype.key);
Storage.prototype.removeItem = function removeItem(k) {
  debugger
  delete this[k]
}; catvm.safefunction(Storage.prototype.removeItem);
Storage.prototype.setItem = function setItem(k, v) {
  debugger
  this[k] = v
}; catvm.safefunction(Storage.prototype.setItem);

Storage.prototype.__defineGetter__('length', function length() {
  return Object.keys(this).length
})

let localStorage = {}
localStorage.__proto__ = Storage.prototype
localStorage = catvm.proxy(localStorage)

let sessionStorage = {}
sessionStorage.__proto__ = Storage.prototype
sessionStorage = catvm.proxy(sessionStorage)

// file: browser/mimeType.js
catvm.memory.MimeType = {}

const MimeType =function MimeType()
{
    throw new TypeError('Illegal constructor')
}
catvm.safefunction(MimeType);

Object.defineProperties(MimeType.prototype,{
    [Symbol.toStringTag]:{
        value:'MimeType',
        configurable:true,
    }
})

MimeType.prototype.description = ''
MimeType.prototype.enabledPlugin = null
MimeType.prototype.suffixes = ''
MimeType.prototype.type = 0

for (let pr in MimeType.prototype) {
    if(typeof (MimeType.prototype[pr]) != 'function'){
        MimeType.prototype.__defineGetter__(pr,function(){
            return this[pr]
        }
        )
    }
    
}

catvm.memory.MimeType.new = function(data,initPlugin){
    let mimeType = {}

    if(data != undefined){
        mimeType.description = data.description
        mimeType.enabledPlugin = initPlugin
        mimeType.suffixes = data.suffixes
        mimeType.type = data.type
    }
    mimeType.__proto__ = MimeType.prototype
    return mimeType
}
// file: browser/plugin.js
catvm.memory.Plugin = {}

const Plugin =function Plugin()
{
    throw new TypeError('Illegal constructor')
}
catvm.safefunction(Plugin);

catvm.memory.Plugin.iterator = function values(){
    debugger
    return {
        next:function(){
            if(this.index_ == undefined){
                this.index_ = 0
            }
            let temp = this.self_[this.index_]
            this.index_++
            if(temp!=undefined)
            {
            return {done:false,value:temp}
            }
            else
            {
                return {done:true,value:undefined}
            }
        },
        self_:this,
    }
}
catvm.safefunction(catvm.memory.Plugin.iterator);

Object.defineProperties(Plugin.prototype,{
    [Symbol.toStringTag]:{
        value:'Plugin',
        configurable:true,
    },
    [Symbol.iterator]:{
        value:catvm.memory.Plugin.iterator,
        configurable:true,
    }
})

Plugin.prototype.description = ''
Plugin.prototype.filename = ''
Plugin.prototype.name = ''
Plugin.prototype.length = 0

Plugin.prototype.item = function item(index){
    debugger
    return this[index]
}
catvm.safefunction(Plugin.prototype.item);
Plugin.prototype.namedItem = function namedItem(key){
    debugger
    return this[key]
}
catvm.safefunction(Plugin.prototype.namedItem);

for (let pr in Plugin.prototype) {
    if(typeof (Plugin.prototype[pr]) != 'function'){
        Plugin.prototype.__defineGetter__(pr,function(){
            throw new TypeError('Illegal constructor')
        }
        )
    }
    
}


catvm.memory.Plugin.new = function(data){
    let plugin = {}

    if(data != undefined){
        plugin.description = data.description
        plugin.filename = data.filename
        plugin.name = data.name

        if(data.MimeTypes != undefined){
          for (let mtindex = 0; mtindex < data.MimeTypes.length; mtindex++) {
              let mtindex = data.MimeTypes[mtindex]
              let mimeType = catvm.memory.MimeType.new(mtindex,plugin)

              plugin[mtindex] = mimeType
              /* plugin[mimeType.type] = mimeType */
              Object.defineProperty(plugin,mimeType.type,{
                    value:mimeType,
              })

            
          }}
          plugin.length = data.MimeTypes.length
    }
    plugin.__proto__ = Plugin.prototype
    return plugin
}
// file: browser/pluginArray.js


const PluginArray =function PluginArray()
{
    throw new TypeError('Illegal constructor')
}
catvm.safefunction(PluginArray);

catvm.memory.PluginArray.iterator = function values(){
    debugger
  
}
catvm.safefunction(catvm.memory.PluginArray.iterator);

Object.defineProperties(PluginArray.prototype,{
    [Symbol.toStringTag]:{
        value:'PluginArray',
        configurable:true,
    },
    [Symbol.iterator]:{
        value:catvm.memory.PluginArray.iterator,
        configurable:true,
    }
})

PluginArray.prototype.item = function item(index){
    debugger
    return this[index]

}
catvm.safefunction(PluginArray.prototype.item)
PluginArray.prototype.namedItem = function namedItem(key){
    debugger
    return this[key]
}
catvm.safefunction(PluginArray.prototype.namedItem)
PluginArray.prototype.refresh = function refresh(){
    debugger
}
catvm.safefunction(PluginArray.prototype.refresh)
PluginArray.prototype.length = 0

for (let pr in PluginArray.prototype) {
    if(typeof (PluginArray.prototype[pr]) != 'function'){
        PluginArray.prototype.__defineGetter__(pr,function(){
            throw new TypeError('Illegal constructor')
        }
        )
    }
    
}

catvm.memory.PluginArray._ = {}
catvm.memory.PluginArray._.__proto__ = PluginArray.prototype
catvm.memory.PluginArray._= catvm.proxy(catvm.memory.PluginArray._)

navigator.plugins = catvm.memory.PluginArray._

// file: browser/mimeTypeArray.js
catvm.memory.MimeTypeArray = {}

const MimeTypeArray =function MimeTypeArray()
{
    throw new TypeError('Illegal constructor')
}
catvm.safefunction(MimeTypeArray);

catvm.memory.MimeTypeArray.iterator = function values(){
    debugger
  
}
catvm.safefunction(catvm.memory.MimeTypeArray.iterator);

Object.defineProperties(MimeTypeArray.prototype,{
    [Symbol.toStringTag]:{
        value:'MimeTypeArray',
        configurable:true,
    },
    [Symbol.iterator]:{
        value:catvm.memory.MimeTypeArray.iterator,
        configurable:true,
    }
})

MimeTypeArray.prototype.item = function item(index){
    debugger
    return this[index]

}
catvm.safefunction(MimeTypeArray.prototype.item)
MimeTypeArray.prototype.namedItem = function namedItem(key){
    debugger
    return this[key]
}
catvm.safefunction(MimeTypeArray.prototype.namedItem)

MimeTypeArray.prototype.length = 0

for (let pr in MimeTypeArray.prototype) {
    if(typeof (MimeTypeArray.prototype[pr]) != 'function'){
        MimeTypeArray.prototype.__defineGetter__(pr,function(){
            throw new TypeError('Illegal constructor')
        }
        )
    }
    
}

navigator.mimeTypes = {}
/* navigator.mimeTypes.temp = 0

for (let pindex = 0; pindex < navigator.plugins.length; pindex++) {
    let plugin_ = navigator.plugins.item(pindex)
    for (let mindex = 0; mindex < plugin_.length; mindex++) {
        let mimeType_ = plugin.item(mindex)
        if(navigator.mimeTypes[mimeType_.type] == undefined){
            navigator.mimeTypes[navigator.mimeTypes.temp] = mimeType_
            Object.defineProperty(navigator.mimeTypes,mimeType_.type,{
                value:mimeType_,
            })
            navigator.mimeTypes.temp++
        }
   
    }
    
    
}
delete  navigator.mimeTypes.temp */

navigator.mimeTypes.__proto__ = MimeTypeArray.prototype
navigator.mimeTypes = catvm.proxy(navigator.mimeTypes)
// file: browser/HTMLElements/htmlDivElement.js
const HtmlDivElement =function HtmlDivElement()
{
    throw new TypeError('Illegal constructor')
}
catvm.safefunction(HtmlDivElement);

Object.defineProperties(HtmlDivElement.prototype,{
    [Symbol.toStringTag]:{
        value:'HtmlDivElement',
        configurable:true,
    }
})

//htmlDivElement = catvm.proxy(htmlDivElement)

catvm.memory.htmlElements['div'] = function(){
    const div = new (function(){})

    div.align = ''

    div.__proto__ = HtmlDivElement.prototype
    return div
}
// file: browser/document.js
const Document = function Document() {
}

catvm.safefunction(Document);

Object.defineProperties(Document.prototype, {
  [Symbol.toStringTag]: {
    value: 'Document',
    configurable: true,
  }
})

let document = {}
document.__proto__ = Document.prototype
document.cookie = ''
document.referrer = location.href || ''
document.getElementById = function getElementById(id) {
  return null
}
catvm.safefunction(document.getElementById)
document.addEventListener = function addEventListener(type, listener, useCapture) {

}
catvm.safefunction(document.addEventListener)

document.createElement = function createElement(tagName) {
  let tagname = tagName.toLowerCase() + ''
  if (catvm.memory.htmlElements[tagname] == undefined) {
    debugger
  }
  return catvm.proxy(catvm.memory.htmlElements[tagname]())

}
catvm.safefunction(document.createElement)

document = catvm.proxy(document)

console.log("hello world")