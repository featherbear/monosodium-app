<script context="module">
  export async function preload(page, session) {
    if (!session) {
      this.redirect(302, "/");
    }

    let resp = await this.fetch("checks/messenger", {
      method: "POST",
    }).then((r) => r.json());
    if (!resp.status) {
      return this.error(resp.error);
    }

    return {
      messengerCheck: resp.data,
    };
  }
</script>

<script lang="ts">
  import { modal } from "uikit";

  let data = {
    auth: {
      username: null,
      password: null,
    },
  };

  let isMessengerStatusPolling = false;
  export let messengerCheck: null | { active: boolean; uid: string };

  function handleMessengerConnect() {
    isMessengerStatusPolling = true;

    // TODO: Send request to login and check UID

    createMessengerStatusPoll()
      .then((r) => console.log(r))
      .catch((e) => console.error(e))
      .finally(() => {
        isMessengerStatusPolling = false;
      });
  }

  async function createMessengerStatusPoll() {
    return new Promise((resolve, reject) =>
      (async function theWholeDamnThing() {
        let resp = await fetch("checks/messenger", {
          method: "POST",
        }).then((r) => r.json());
        if (!resp.status) return reject(resp.error);
        if (resp.data === true) return resolve(true);
        setTimeout(theWholeDamnThing, 2500);
      })()
    );
  }

  //   let states = {};
</script>

{#if messengerCheck === null}
  <form
    class="uk-width-medium"
    on:submit|preventDefault={handleMessengerConnect}
  >
    <input
      bind:value={data.auth.username}
      type="text"
      class="uk-input"
      name="username"
      placeholder="Facebook Username"
    />

    <input
      bind:value={data.auth.password}
      type="password"
      class="uk-input "
      name="password"
      placeholder="Facebook Password"
    />

    {#if isMessengerStatusPolling}
      <div class="uk-button uk-button-primary" uk-spinner />
    {:else}
      <button type="submit" class="uk-button uk-button-primary">Connect</button>
    {/if}
  </form>

  <button
    class="uk-button uk-button-default uk-button-small"
    on:click={async () =>
      modal.alert(
        "Yes,</br>but like</br>well</br>like</br>\uD83E\uDD37\u200D\u2642\uFE0F"
      )}>Hang on, this is dodgy...</button
  >
{:else if messengerCheck.active === false}
  <span>Disconnected from account {messengerCheck.uid}</span>

  <form
    class="uk-width-medium"
    on:submit|preventDefault={handleMessengerConnect}
  >
    <input
      bind:value={data.auth.username}
      type="text"
      class="uk-input"
      name="username"
      placeholder="Facebook Username"
    />

    <input
      bind:value={data.auth.password}
      type="password"
      class="uk-input "
      name="password"
      placeholder="Facebook Password"
    />

    {#if isMessengerStatusPolling}
      <div class="uk-button uk-button-primary" uk-spinner />
    {:else}
      <button type="submit" class="uk-button uk-button-primary"
        >Reconnect</button
      >
    {/if}
  </form>
{:else if messengerCheck.active === true}
  <span>Connected to account {messengerCheck.uid}</span>
  <button
    on:click={() => {
      let diag = modal.confirm(
        "Are you sure you want to disconnect the current Messenger account"
      );

      let btn = diag.dialog.$el.querySelector(".uk-button-primary");
      btn.classList.remove("uk-button-primary");
      btn.classList.add("uk-button-danger");

      console.log(diag.dialog.$el);
      diag.then(
        () => {
          // TODO: Handle disconnect
        },
        () => {
          // Do nothing if rejected
        }
      );
      // Modal
    }}
    class="uk-button uk-button-danger">Disconnect</button
  >{:else}
  Error hm
{/if}
