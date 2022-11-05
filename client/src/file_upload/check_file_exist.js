// todo
export default async function check_file_existance(file_name) {
  try {
    let response = await fetch("/files/check_name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: file_name }),
    });

    let result = await response.json();

    if (result === "yes") {
      let answer = window.confirm("Այդպիսի ֆայլ կա պահոցում։ Շարունակե՞լ։");
      if (!answer) {
        return false;
      }
    }

    return true;
  } catch (err) {
    console.error(err);
  }
}
