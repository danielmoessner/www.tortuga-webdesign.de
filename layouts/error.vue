<template>
  <div>
    <TheError
      code="404"
      title="Seite nicht gefunden"
      message="Leider ist die gewünschte Seite nicht verfügbar."
    />
  </div>
</template>

<script>
import TheError from "@/components/TheError";

export default {
  components: {
    TheError,
  },
  layout: "empty",
};
</script>
