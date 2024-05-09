import { useState } from "react";
import { Commenturl,LikeCommenturl,DislikeCommenturl } from "../../src";
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
      Commenturl + `GetAllCommentForBlog/${1}`,Requestoptions
    );
   
    const data = await response.json()
   
    if(response.status == 200){

        setGetAllComment(data.result)
    }

  }

  const createComment= async(id)=>{

    const Requestoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({"content":comment, "blogId":id})
      
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

  const LikeComment = async(id)=>{
     const formData = new FormData();
    formData.append("CommentId", id);
     const Requestoptions = {
       method: "POST",
       headers: {
         Authorization: "Bearer " + token,
       },
       body: formData,
     };
    const response = await fetch(LikeCommenturl +"LikeComment" ,Requestoptions);
    
    if (response.status == 204){
      console.log("success")
    }
  }

   const DislikeComment = async(id) => {
       const formData = new FormData();
       formData.append("CommentId", id);
       const Requestoptions = {
         method: "POST",
         headers: {
           Authorization: "Bearer " + token,
         },
         body: formData,
       };
    const response = await fetch(DislikeCommenturl +"DisLikeComment" ,Requestoptions);
    if (response.status == 200){
      console.log("success")
    }
      
   };

  



  return (
    <>
        <button type="button" onClick={getAllCommnet}>GetallComment</button>
        {getAllComment.map((comment)=>(

            <div key={comment.id}>
              <p>{comment.id}</p>
                <p>{comment.content}</p>
                <p>{comment.likeCount}</p>
                <p>{comment.disLikeCount}</p>
                <button type="button" onClick={()=>{LikeComment(comment.id)}}>Like</button>
                <button type="button" onClick={()=>{DislikeComment(comment.id)}}>Dislike</button><br />
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
        <button type="button" onClick={()=>{createComment()}}>comment</button> 
     
    </>
  );
};

export default Comment;
