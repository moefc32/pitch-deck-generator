<script>
  import { Avatar } from "@skeletonlabs/skeleton";
  import md5 from "md5";

  export let email = "";
  export let size = 40;

  let hashed;

  $: {
    hashed = md5(email);
  }
</script>

<div style="width: {size}px; height: {size}px;">
  <Avatar
    src="https://gravatar.com/avatar/{hashed}?s={size}"
    width="w-${size}"
    rounded="rounded-full"
  />
</div>
