$(document).ready(function () {
  comment();
  member();
});

function member() {
  fetch("/members")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      console.log(rows);

      $("#member").empty();

      rows.forEach((a) => {
        let name = a["name"];
        let img = a["img"];
        let merits = a["merits"];
        let selfIntro = a["selfIntro"];
        let style = a["style"];

        let fireImage = "🔥".repeat(fire);

        let temp_html = `
      
                <li id="${name}" class="slideitem">
                    <a>
                        <section id="member">
                            <div id="kys">
                                <div class="member-inner">
                                    <h2>${name}</h2>
                                    <div class="member-box">
                                        <div class="member-img">
                                             <img src="${img}" alt="${name}">
                                        </div>
                                        <div class="member-txt-box">
                                            <div class="member-info">
                                                <h3>자기소개</h3>
                                                <p class="white-box">
                                                    ${selfIntro}
                                                </p>
                                            </div>
                                            <div class="member-strength">
                                                <h3>자신의 장점</h3>
                                                <p class="white-box">
                                                     ${merits}
                                                </p>
                                            </div>
                                            <div class="member-style">
                                                <h3>협업 스타일(동물)</h3>
                                                <p class="white-box">${style}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </a>
                </li>
    `;
        $(".slidelist").append(temp_html);
      });
    });
}

function comment() {
  fetch("/comments")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      console.log(rows);

      $("#comment-show").empty();

      rows.forEach((a) => {
        let name = a["name"];
        let comment = a["comment"];
        let fire = a["fire"];

        let fireImage = "🔥".repeat(fire);

        let temp_html = `<tr>
                          <td>${name}</td>
                          <td>${fireImage}</td>
                          <td>${comment}</td>
                        </tr>`;
        $("#comment-show").append(temp_html);
      });
    });
}

function save_form() {
  let name = $("#name").val();
  let fire = $("#fire").val();
  let comment = $("#comment").val();

  let formData = new FormData();
  formData.append("name_give", name);
  formData.append("comment_give", comment);
  formData.append("fire_give", fire);

  fetch("/comments", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      console.log(data["msg"]);
      alert(data["msg"]);
      window.location.reload();
    });
}
