<script lang="ts">
  import { stores } from "@sapper/app";

  let { page, preloading, session } = stores();
  console.log($page, $preloading, $session);
  let isRequest = false;

  async function onFormSubmit() {
    isRequest = true
    console.log("submit");


    // isRequest = false
  }
</script>

<form class="uk-width-medium" on:submit|preventDefault={onFormSubmit}>
  <input type="text" class="uk-input" name="username" placeholder="Username" />

  <input
    type="password"
    class="uk-input "
    name="password"
    placeholder="Password"
  />
  <button uk-spinner={isRequest || undefined} type="submit" class="uk-button uk-button-primary">Login</button>
</form>

<a href="/register">
  <button
    class="uk-button uk-button-text"
    disabled={!process.env.REGISTRATION_ENABLED}
  >
    Register {!process.env.REGISTRATION_ENABLED && "(disabled)"}
  </button>
</a>
