import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Link from "next/link";
import { useState, useRef } from "react";

import classes from "./Editor.module.css";
import CategoryModal from "./CategoryModal";

const Editor = (props) => {
  let loadedArticle = props.selectedArticle;

  if (loadedArticle === undefined) {
    loadedArticle = {
      title: "",
      category: "카테고리 없음",
      content: "",
    };
  }

  const titleInputRef = useRef();

  const [categoryModalSwitch, setCategoryModalSwitch] = useState(false);
  const [id, setId] = useState(loadedArticle.id);
  const [title, setTitle] = useState(loadedArticle.title);
  const [content, setContent] = useState(loadedArticle.content);
  const [category, setCategory] = useState(loadedArticle.category);
  const [inputClass, setInputClass] = useState(classes.title_input);

  let article = [];

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
    setInputClass(classes.title_input);
  };

  const contentChangeHandler = (event, editor) => {
    const data = editor.getData();
    // console.log({ event, editor, data });
    setContent(data);
  };

  const categoryHandler = () => {
    event.preventDefault();
    setCategoryModalSwitch(!categoryModalSwitch);
  };

  const articleSubmitHandler = () => {
    event.preventDefault();
    if (title.trim() === "") {
      setInputClass(classes.title_input_invalid);
      titleInputRef.current.focus();
      return;
    } else {
      props.submitArticleHandler(
        (article = {
          id: id,
          title: title,
          content: content,
          category: category,
          likes: 0,
          likedUsers: ["users"],
        })
      );
    }
  };

  return (
    <div className="App">
      <form>
        <div>
          <button className={classes.category} onClick={categoryHandler}>
            {category}
          </button>
          {categoryModalSwitch ? (
            <CategoryModal
              ModalClose={setCategoryModalSwitch}
              selectCategory={setCategory}
            />
          ) : (
            ""
          )}
        </div>
        <input
          type="text"
          className={`${inputClass}`}
          placeholder="제목을 입력하세요"
          onChange={titleChangeHandler}
          ref={titleInputRef}
          value={title}
        />
        <div className={classes.editor}>
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "내용을 입력하세요",
            }}
            data={content}
            onChange={contentChangeHandler}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
        <div className={classes.btns}>
          <Link href="/">
            <button className={classes.return}>돌아가기</button>
          </Link>
          <div>
            <button className={classes.save}>임시저장</button>
            <button className={classes.submit} onClick={articleSubmitHandler}>
              등록
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Editor;
