import { useForm } from "react-hook-form";
import { IFieldValue } from "../../types";
import "./index.scss";

const NewItem = ({
  todo,
  id,
  onAdd,
}: {
  todo?: string;
  id?: string;
  onAdd: any;
}) => {
  const { register, handleSubmit } = useForm<IFieldValue>({
    reValidateMode: "onChange",
  });

  const onSubmit = (data: IFieldValue) => {
    onAdd(data["todo"], id);
  };
  return (
    <div className="edit--item">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("todo")} defaultValue={todo} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NewItem;
