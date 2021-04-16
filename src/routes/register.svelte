<script lang="ts">
  import type Response from "../types/Response";

  let isRequest = false;

  let data = {
    username: "",
    password: "",
  };

  let password2;
  let shouldShowPasswordConfirm = false;

  $: !!data.password && (shouldShowPasswordConfirm = true);

  let canRegister = false;
  $: canRegister =
    data.username.trim().length > 0 &&
    data.password &&
    data.password === password2;

  async function onFormSubmit() {
    isRequest = true;
    try {
      let resp: Response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json());
      if (resp.status == false) {
        alert(resp.error);
      } else {
      }
    } finally {
      isRequest = false;
    }
  }
</script>

{#if process.env.REGISTRATION_ENABLED}
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

    {#if shouldShowPasswordConfirm}
      <input
        bind:value={password2}
        type="password"
        class="uk-input "
        name="password"
        placeholder="Confirm password"
      />

      {#if password2 && data.password !== password2}
        Password mismatch
      {/if}
    {/if}

    {#if isRequest}
      <div class="uk-button uk-button-primary" uk-spinner />
    {:else}
      <button
        type="submit"
        class="uk-button uk-button-primary"
        disabled={!canRegister}>Register</button
      >
    {/if}
  </form>

  <a href="/login">
    <button class="uk-button uk-button-text"> Login </button>
  </a>
{:else}
  Registrations are currently not enabled
{/if}
