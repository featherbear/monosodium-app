<script context="module">
  export async function preload(page, session) {
    if (!session) {
      this.redirect(302, "/");
    }

    let resp = await this.fetch("checks/messenger", {
      method: "POST",
      credentials: "include",
    }).then((r) => r.json());
    if (!resp.status) {
      return this.error(resp.error);
    }

    return {
      messengerStatus: resp.data,
    };
  }
</script>

<script lang="ts">
  export let messengerStatus;
</script>

{#if messengerStatus === null}
  First time
{:else if messengerStatus === false}
  Need reauth
{:else if messengerStatus === true}
  Gucci
{:else}
  Error hm
{/if}
