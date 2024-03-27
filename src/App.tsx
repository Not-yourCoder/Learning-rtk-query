import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTodos, fetchTags, fetchTodos } from './helper/query-hooks';



function App() {

  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
  const { data: tagData } = useQuery({ queryKey: ["tags"], queryFn: fetchTags });
  const { data: postData, mutate, isError: isPostError, reset, error: postError, isPending } = useMutation({
    mutationFn: addTodos, onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"]
      })
    },
    onError: () => {
      setTimeout(() => {
        reset()
      }, 3000)
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get("title")
    const tags = Array.from(formData.keys()).filter(key => formData.get(key) === "on")


    if (!title || !tags) return
    mutate({ id: data?.length + 1, title, tags })
    e.target.reset();
  }
  return (
    < div >
      <p>Hello app</p>
      {isLoading || isPending && <p>Loading todos...😌</p>}

      <div style={{ border: "red" }}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder='Enter task' style={{ marginBottom: "10px" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            {tagData?.map((tags, index) => (
              <div style={{ display: "flex", alignItems: "center" }} key={index}>
                <input type="checkbox" name={tags} placeholder='Enter task' id={tags} />
                <label htmlFor={tags}>{tags}</label>
              </div>
            ))}
          </div>
          <button style={{ padding: "5px 8px", backgroundColor: "red", margin: "10px 0" }}>Post</button>
        </form>
      </div>
      {
        data?.map((todo: any, index: number) => (
          <div>
            <p key={index}>{todo.id}. {todo.title}</p>
            <div style={{ display: "flex", gap: "10px", }}>
              {todo.tags.map((tags, index) => (
                <p style={{ margin: "10px", backgroundColor: "goldenrod", padding: "6px 10px", borderRadius: "6px" }} key={index}>{tags}</p>
              ))
              }

            </div>
          </div>
        ))
      }
      {isError && <p>Failed to fetch data. 🤥</p>}
      {isPostError && <p>Unable to post data now. 😑</p>}
    </ div>

  )

}

export default App