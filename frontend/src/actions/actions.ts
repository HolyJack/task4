import { ActionFunction, redirect } from "react-router-dom";
import usersApi from "../utils/users";

type actionParams =
  | {
      selected: string[];
      active: boolean;
    }
  | { selected: string[] };

function usersActionsWrapper(
  action: (params: actionParams) => Promise<void>,
  active?: boolean,
) {
  const usersAction: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const selected = (formData.get("selected") as string).split(",");
    console.log(selected);
    selected &&
      selected.length &&
      (await action(
        typeof active === "boolean" ? { selected, active } : { selected },
      ));
    return redirect("/dashboard");
  };

  return usersAction;
}

export const unblockAction = usersActionsWrapper(
  usersApi.update as (params: actionParams) => Promise<void>,
  true,
);
export const blockAction = usersActionsWrapper(
  usersApi.update as (params: actionParams) => Promise<void>,
  false,
);
export const deleteAction = usersActionsWrapper(usersApi.delete);
