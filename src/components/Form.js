import React from "react";
import { useRef,useCallback } from "react";

function Form(props) {
    console.log("form");
  const titleInput = useRef();
  const openingTextInput = useRef();
  const dateInput = useRef();
  const submit=(e)=>{
    e.preventDefault();
    const obj = {
        title: titleInput.current.value,
        openingText: openingTextInput.current.value,
        releaseDate: dateInput.current.value,
      };
      props.onClick(obj)
  }
  
  return (
    <div>
      <section>
        <form onSubmit={submit}>
          <label>Title</label>
          <br />
          <input type="text" size="80" ref={titleInput} />
          <br />
          <br />
          <label>OpeningText </label>
          <br />
          <textarea rows="6" cols="75" ref={openingTextInput}></textarea>
          <br />
          <br />
          <label>Release Date</label>
          <br />
          <input type="text" size="80" ref={dateInput} />
          <br />
          <br />
          <button>Add Movies</button>
        </form>
      </section>
    </div>
  );
}

export default React.memo(Form);
