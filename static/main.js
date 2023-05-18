$(document).ready(function () {
  comment();
  member();
  close_box();
  like();
});
// 좋아요를 DB에서 가져와서 출력합니다.
function like() {
  fetch("/like")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      // console.log(rows);

      $("#likeArea").empty()

      rows.forEach((a) => {
        let like = a["likeNum"];

        let temp_html = `
        <span id="like-count">${like}</span>
        <a>개의 응원이 모였어요</a>`;

        $('#likeArea').append(temp_html)
      });
      });
    }

// 멤버 정보를 DB에서 가져와서 출력합니다.
function member() {
  fetch("/members")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      // console.log(rows);

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

// 댓글을 DB에서 모두 가져와서 출력합니다.
function comment() {
  fetch("/comments")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      // console.log(rows);

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

  
// 빡코더 되기 열기 버튼
function open_box() {
  $("#post-box").show();
}

// 빡코더 되기 닫기 버튼
function close_box() {
  $("#post-box").hide();
}
