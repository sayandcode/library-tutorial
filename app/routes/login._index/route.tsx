import type { ActionFunctionArgs } from '@remix-run/node';

export async function action(args: ActionFunctionArgs) {
  // TODO: Handle login request
  console.log(args);
  return null;
}
