# Doxygenate

Doxygenate is a package for the Atom text editor which will automatically
generate Doxygen style comment blocks within your code.

It is designed to be somewhat intelligent and select the appropriate style
based on where the comment block is requested to be generated. More work on
this feature is required in the future to increase the level of automation
that is offered.

## Use

Press `ctrl+alt+d` anywhere in your code to auto generate an appropriate
comment block.

You can manually insert different types of comment block via the "Packages"
menu item, or via the right-click contextual menu item.

## Available Comment Blocks

**File:**

```
/**
 * @file {filename}
 * @author {author}
 * @date YYYY-MM-DD
 * @copyright YYYY {copyright holder}
 * @brief {short description}
 * @detail {detailed description}
 */
```

**Class:**

```
/**
 * @brief {short class description}
 */
```

**Function:**

```
/**
 * @brief {short description}
 * @param {parameter description}
 * @return {return description}
 * @detail {detailed description}
 */
```

**Member:**

```
/**< {member description} */
```
