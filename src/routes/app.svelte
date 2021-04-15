<script context="module">
  export async function preload(page, session) {
    console.log(this);
    console.log(session);
    if (!session) {
      console.log("no session");
      return this.redirect(302, "/login");
    }
    return {a:2}
  }
</script>
<script lang="ts">
    export let a;
    console.log(a);

</script>
<!-- Chat participants -->
<!-- Messages -->
<!-- Send box -->
App
