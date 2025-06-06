import { Badge } from "@/components/ui/badge";
import { useMeQuery } from "@/hooks/react-query/queries/user/useMeQuery";
import React from "react";

export default function UsernameColumn({
  data,
}: {
  data: { id: string; username: string };
}) {
  const { data: response } = useMeQuery();
  const id = response.data.id;
  const isMe = id === data.id;

  return (
    <div className="flex items-center space-x-2">
      <div>{data.username}</div>
      {isMe && <Badge variant="default">คุณ</Badge>}
    </div>
  );
}
