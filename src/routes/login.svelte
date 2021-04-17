<script lang="ts">
  import type Response from "../types/Response";

  let isRequest = false;

  let data = {
    username: "",
    password: "",
  };

  async function onFormSubmit() {
    isRequest = true;
    try {
      let resp: Response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json());
      if (resp.status == false) {
        alert(resp.error);
      } else {
        location.href = "/";
      }
    } finally {
      isRequest = false;
    }
  }
</script>

<form class="uk-width-medium" on:submit|preventDefault={onFormSubmit}>
  <input
    bind:value={data.username}
    type="text"
    class="uk-input"
    name="username"
    placeholder="Username"
  />

  <input
    bind:value={data.password}
    type="password"
    class="uk-input "
    name="password"
    placeholder="Password"
  />

  {#if isRequest}
    <div class="uk-button uk-button-primary" uk-spinner />
  {:else}
    <button type="submit" class="uk-button uk-button-primary">Login</button>
  {/if}
</form>

<a href="/register">
  <button
    class="uk-button uk-button-text"
    disabled={!process.env.REGISTRATION_ENABLED}
  >
    Register {process.env.REGISTRATION_ENABLED ? "" : "(disabled)"}
  </button>
</a>
