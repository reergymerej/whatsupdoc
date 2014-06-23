# Whats Up Doc

Generate API docs and insert them into your project's README with practically no effort.  Document your code with comment blocks and **whatsupdoc** does the rest.

[How to Use](#howto) | [Tags](#tags) | [Customization](#customization) | [Examples](#examples) | [Thanks](#thanks)

<a name="howto"></a>
## How to Use

**Step 1**

Document your code with blocks like this.

```js
/**
* @name getSome
* @description Get the sum of two numbers.
* @param {Number} a the first number
* @param {Number} [b=3.14] the second number
* @return {Number}
* @public
*/
getSome: function (a, b) {
    if (b === undefined) {
        b = 3.14;
    }
    return a + b;
}
```

**Step 2**

The clarity and maintainability of your code has undoubtably already improved, but if you want, you can run this from your terminal.

    ./whatsupdoc .

This will find documentation blocks in JavaScript files in the current directory and add them to the end of README.md.

<a name="tags"></a>
**Step 3**

Watch the adoption rate of your beautiful code skyrocket because you made it easy for people to use.

## Tags

The supported tags are listed here for quick reference.  If you'd prefer, you can skip to the [examples](#examples) and learn by trying.

**[@class](#class)**  
**[@description](#description)**  
**[@function](#function)**  
**[@method](#method)**  
**[@name](#name)**  
**[@param](#param)**  
**[@private](#private)**  
**[@return](#return)**  

---

### Simple Text Tags

These tags should be followed by some text.  If needed, the text can span multiple lines.

<a name="description"></a>
**@description**

Do you really need a description of description?

<a name="name"></a>
<a name="method"></a>
<a name="function"></a>
<a name="class"></a>
**@name**

The name of the method, function, or class being documented.  You can also use **@method**, **@function**, or **@class**.

---

### Complex Tags

These tags should be followed by one or more of the following optional elements *in this order*:

* An indication of the type of value, wrapped in braces.  These don't have to be real types, but here are some suggestions.

    *   {String}
    *   {Number}
    *   {String/Number}
    *   {String[]}
    *   {DonkeyCake}

* The name of the parameter we're describing.  You can also indicate a parameter is optional and its default value if you're so inclined.  Name doesn't make sense for @return, since you don't know who's handling it, but it is here for uniformity.

    *   foo
    *   [foo]
    *   [foo=42]

* A description of what the heck this thing is.  This can span multiple lines if you are particularly loquacious.

<a name="param"></a>
**@param**

A parameter passed to the function.  *See above for options.*

<a name="return"></a>
**@return**

The value returned from the function.  *See above for options.*

---

<a name="private"></a>
### Privacy Flag

If you want to document blocks for your own convenience, but not have them show up in the generated API docs, use `@private`.

```js
/**
* @description This block won't show up in the generated docs.
* @private
*/
```

<a name="customization"></a>
## Customization

If you don't want the docs added to the *end* of your README, you can specify where they'll be inserted by adding

```html
<!--- whatsupdoc-start --><!--- whatsupdoc-end -->
```

You can customize options by including a `.whatsupdocrc` in the directory being scanned.  The example below represents the defaults.

```json
{
    "exclude": ["node_modules", "test"],
    "outputFile": "README.md",
    "blockTemplate": "block-template.txt"
}
```

Similarly, if you don't like the default output, you can create your own `block-template.txt` in the scanned directory.  It will be compiled by [Swig](http://paularmstrong.github.io/swig/) and used to generate you documentation.  The glossary below describes the values that may appear for each documentation block.

* **description** - the description of the block
* **name** - the name of the block
* **params** - an Array of param Objects for the block; Each param may have the properties:
    * **default** - default value
    * **description** - description of parameter
    * **name** - name of parameter
    * **optional** - true/false if the parameter is optional
    * **type** - type(s) expected for parameter
* **returns** - Object describing what the block returns.  The returns Object may have the properties:
    * **description** - description of returned value
    * **type** - type(s) to be returned

<a name="examples"></a>
## Examples

```js
/**
* @name someFoo
* @description Do the foo stuff.
* @param {String} foo the foo
* @param {Boolean} [bar=false] some bar
* @return {Object} asdf something is returned
*/

/**
* @name getStringLength
* @description Returns the number of characters
* in a string.
* @param {String} str the string to be examined - Oh, yeah.  I
* forgot to mention that any description can span multiple
* lines.
* @return {Number}
*/

/**
* @description This one doesn't have much info.
* @param foo
* @param [bar]
*/

/**
* @description This is an internal function that
* we don't want included in the API docs.
* @param {String[]} foo an Array of Strings
* @param {Boolean} [bar=false] another cryptic option
* @private
*/
```

<a name="thanks"></a>
## Thanks

Thank you for taking the time to check out **whatsupdoc**.  If you have any comments or suggestions, please reach out.