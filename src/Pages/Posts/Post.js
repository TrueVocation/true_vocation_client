import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default Post;
