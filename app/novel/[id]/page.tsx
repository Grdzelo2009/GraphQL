"use client";
import { ADD_AUTHOR, DELETE_AUTHOR, UPDATE_NOVEL } from "@/graphql/Mutations";
import { GET_NOVEL } from "@/graphql/queries";
import { INovel } from "@/typings";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { useParams } from "next/navigation";
import { IoExitOutline } from "react-icons/io5";

const Novel = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);

  const { data, loading, error } = useQuery(GET_NOVEL, {
    variables: { id },
  });

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    variables: { id: id, name },
    refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
  });

  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    variables: {id: id},
    refetchQueries:  [{ query: GET_NOVEL, variables: { id } }]
  });

  const [updateNovel] = useMutation(UPDATE_NOVEL, {
    variables: { id, title, image: url },
    refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
  });

  const novel: INovel = data?.novel;

  const handleAddAuthor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "") return alert("Please enter author name");
    addAuthor({ variables: { novelId: id, name } });
    setName("");
  };

  const handleUpdateNovel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" && url === "") return alert("Please enter fields");
    updateNovel({ variables: { id, title, image: url } });
    setTitle("");
    setUrl("");
    setShowUpdate(false)
  };

  if (loading)
    return (
      <p className="text-white flex items-center justify-center">
        Loading ....
      </p>
    );

  if (error) {
    console.error("GraphQL Error:", error); 
    return (
      <p className="text-white flex items-center justify-center">
        Oops! Something went wrong ....
      </p>
    );
  }

  return (
    <article className="max-w-5xl mx-auto mt-16 text-white">
      <section className="flex gap-2 ">
        {novel.image && (
          <img height={200} width={200} src={novel.image} alt="" />
        )}
        <div className="p-2 flex flex-col">
          <h1 className="text-4xl ">Title : {novel.title}</h1>
          <div className="flex gap-2">
            {novel?.authors?.map((author) => (
              <div key={author.id} className="flex items-center gap-2">
                <h2 className="font-bold">{author?.name}</h2>
                <AiFillMinusCircle
                  onClick={() => {
                    deleteAuthor({
                      variables: {
                        id: novel.id,
                      }
                    });
                  }}
                  color="yellow"
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
          <p className="text-slate-400 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            cum nam sed voluptates sunt aliquid nemo maxime itaque tempora,
            autem alias nostrum molestiae deserunt earum animi numquam
            reprehenderit laboriosam libero? Quas, atque totam vero nostrum
            dolore, nihil autem neque architecto deserunt illo itaque, ab quae
            ipsam corrupti ipsum quaerat? Sed hic ipsum excepturi earum minus
            consectetur soluta totam temporibus libero.
          </p>
          <form onSubmit={handleAddAuthor} className="mt-5 space-x-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Author"
              className="bg-transparent border p-2 mx-2"
            />
            <button
              disabled={!name}
              className="border p-2 rounded-lg disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Add Author
            </button>
          </form>
        </div>
      </section>

      {showUpdate === false? <button
          onClick={() => setShowUpdate(true)}
          className="mt-10 px-3 py-2 bg-red-500 rounded-lg opacity-70 hover:opacity-100 transition-all"
        >
          Change Data
        </button> : undefined}

      {showUpdate && (
        <form onSubmit={handleUpdateNovel} className=" flex mt-10 gap-2 relative ">
          <IoExitOutline onClick={()=>setShowUpdate(false)} className="absolute top-0 left-0 cursor-pointer"/>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter new title"
            className="bg-transparent ml-6 border text-white p-2 rounded-lg"
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="new url"
            className="bg-transparent ml-6 border text-white p-2 rounded-lg"
          />
          <button className="bg-yellow-500 rounded-lg p-2">Update</button>
        </form>
      )}
    </article>
  );
};

export default Novel;
