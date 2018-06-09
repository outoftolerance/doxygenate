'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'doxygenate:run': () => this.run(),
      'doxygenate:insertFileBlock': () => this.insertFileBlock(),
      'doxygenate:insertClassBlock': () => this.insertClassBlock(),
      'doxygenate:insertFunctionBlock': () => this.insertFunctionBlock(),
      'doxygenate:insertMemberBlock': () => this.insertMemberBlock()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  /**
   * @brief Attempts to be smart about which block to insert automatically
   * @detail By looking at user's last input, location in file, etc, can
   * determine which type of comment block to insert.
   */
  run() {
    let editor;
    if(editor = atom.workspace.getActiveTextEditor()) {
      //Separate last string from current line
      let current_line = editor.getLastCursor().getCurrentBufferLine();
      let last_string = current_line.split(' ' ).slice(-1)[0];

      //If last string is a doxygen comment start, do stuff!
      if(last_string == "/**") {
        //Remove user inserted text
        editor.selectLeft(last_string.length);
        editor.insertText("");

        //Find cursor where comment insert is needed
        cursor = editor.getCursorScreenPosition();

        //Get first word of next line
        let next_line = editor.lineTextForScreenRow(cursor.row + 1);
        let next_line_first_string = next_line.split(' ')[0];

        //If at top left, file
        if(cursor.row == 0 && cursor.column == 0) {
          this.insertFileBlock();
        }

        //If other text in same line, member
        else if (current_line.length > 3) {
          this.insertMemberBlock()
        }

        //If class is first word in next time, class
        else if (next_line_first_string == "class") {
          this.insertClassBlock();
        }

        //Otherwise likely a Function
        else {
          this.insertFunctionBlock();
        }
      }
    }
  },

  /**
   * @brief Inserts a file comment block
   */
  insertFileBlock() {
    let editor
    if(editor = atom.workspace.getActiveTextEditor()) {
      //Determine the filename
      let filename = editor.getTitle();

      if(filename == "untitled")
      {
        filename = "<filename>";
      }

      //Figure out the date
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth();
      let day = now.getDate();

      //Assemble comment block
      let comment = "/**\r\n" +
        " * @file " + filename + "\r\n" +
        " * @author <author>\r\n" +
        " * @date " + year + "-" + month + "-" + day + "\r\n" +
        " * @copyright " + year + " <copyright holder>\r\n" +
        " * @brief <short description>\r\n" +
        " * @details <detailed description>\r\n" +
        " */";

      editor.insertText(comment);
    }
  },

  /**
   * @brief Inserts a class comment block
   */
  insertClassBlock() {
    let editor;
    if(editor = atom.workspace.getActiveTextEditor()) {
      let comment = "/**\r\n" +
        " * @brief <short description>\r\n" +
        " */";

      editor.insertText(comment);
    }
  },

  /**
   * @brief Inserts a function comment block
   */
  insertFunctionBlock() {
    let editor;
    if(editor = atom.workspace.getActiveTextEditor()) {
      let comment = "/**\r\n" +
      " * @brief <short description>\r\n" +
      " * @param <param description>\r\n" +
      " * @return <return description>\r\n" +
      " * @details <detailed description>" +
      " */";

      editor.insertText(comment);
    }
  },

  /**
   * @brief Inserts a member comment block
   */
  insertMemberBlock() {
    let editor;
    if(editor = atom.workspace.getActiveTextEditor()) {
      let comment = "/**< {description of member} */";

      editor.insertText(comment);
    }
  }

};
