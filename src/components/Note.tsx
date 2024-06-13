"use client"

import { Note as NoteModel } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import AddEditNoteDialog from "./AddEditNoteDialog";
import { useState } from "react";

interface NoteProps{
  note: NoteModel
}

export default function Note({note}: NoteProps){
  const [showEditDialog, setshowEditDialog] = useState(false)

  const wasUpdated = note.updatedAt > note.createdAt;
  const createdUpdateAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  return (
    <>

    <Card className="cursor-pointer hover:shadow-lg" onClick={()=>setshowEditDialog(true)}>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          {createdUpdateAtTimestamp}
          {wasUpdated && "(update)"}
        </CardDescription>
      </CardHeader>
      <CardContent >
        <p className="whitespace-pre-line">{note.content}</p>
      </CardContent>
    </Card>
    <AddEditNoteDialog open={showEditDialog} setOpen={setshowEditDialog} noteToEdit={note}/>
    </>
  )
}