import { useState } from "react";
import { Commenturl } from "../../src";
import { useSelector } from "react-redux";

const Comment = () => {
  const token = useSelector((state) => state.signin.token);
 const [getAllComment, setGetAllComment] = useState([])
 const [comment, setComment] = useState("")
 const[update, setupdate] = useState(false)
  const getAllCommnet= async()=>{
   
    const Requestoptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetch(
      Commenturl + `GetAllComment?pageSize=${3}&pageNumber=${1}`,Requestoptions
    );
   
    const data = await response.json()
   
    if(response.status == 200){

        setGetAllComment(data.result)
    }

  }

  const createComment= async()=>{

    const Requestoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({"content":comment, "blogId":1})
      
    };

    const response = await fetch(Commenturl+"CreateComment",Requestoptions)
    console.log(await response.json())
    if(response.status == 200){
        console.log("creatred")
    }
    

  }

  const updateComment = async(id)=>{
    const Requestoptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ content: comment}),
    };

    const response = await fetch(Commenturl+`UpdateComment/${id}`,Requestoptions)
    
    if(response.status == 205){
        console.log("updated")
    }
  }

  const deleteComment = async(id)=>{
        const Requestoptions = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch(
          `${Commenturl}DeleteComment/${id}`,
          Requestoptions
        );
        console.log(await response.json())
        if (response.status == 204) {
          console.log("deleted");
        }
  }



  return (
    <>
        <button type="button" onClick={getAllCommnet}>GetallComment</button>
        {getAllComment.map((comment)=>(

            <div key={comment.id}>
                <p>{comment.content}</p>
                <button type="button" onClick={()=> setupdate(true)}>update comment</button>
                <button type="button" onClick={()=>{deleteComment(comment.id)}}>Delete comment</button>
                {update && (<>
                <input type="text" name="update" id="comentupdate" onInput={(e) =>{setComment(e.target.value)}} />
                <button type="button" onClick={()=>{updateComment(comment.id)}}>Update</button>
                </>)}
            </div>
        )

        )}
        <input type="text" name="comment" id="comment" onInput={e=>setComment(e.target.value)} /> 
        <button type="button" onClick={createComment}>comment</button> 
     
    </>
  );
};

export default Comment;
