$(document).ready(function () {
  comment();
  member();
  close_box();
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
      
      <div id="${name}" class="member-card">
      <div class="member-inner">
        <h2>${name}</h2>
        <div class="member-box">    
          <div class="member-img">
          <img src="${img}" alt="${name}">
          </div>
          <div class="member-txt-box">
            <div class="member-info">
              <h4>자기소개</h4>
              <p class="white-box">
                ${selfIntro}
              </p>
            </div>
            <div class="member-strength">
              <h4>자신의 장점</h4>
              <p class="white-box">
                ${merits}
              </p>
            </div>
            <div class="member-style">
              <h4>협업 스타일</h4>
              <p class="white-box">
              ${style}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
        $("#member").append(temp_html);
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

//  폼 작성(댓글) 데이터 저장하는 코드
//  공유하기 유효성 검사 추가하였음
function save_form() {
  let checkName = $("#name");
  let checkFire = $("#fire");
  let checkComment = $("#comment");

  if (!checkName.val()) {
    //  frn의 product의 value값이 없을 때 = input에 입력한 값이 없을 때
    alert("상호명을 입력해 주세요");
    checkName.focus();
    return false; //  경고창을 확인한 후 페이지가 넘어가지 않고 그대로 유지하기 위함, method빼면 못넘어감.
  } else if (checkFire.val() == 0) {
    alert("별점을 선택해 주세요");
    checkFire.focus();
    return false;
  } else if (!checkComment.val()) {
    alert("코멘트를 입력해 주세요");
    checkComment.focus();
    return false;
  } else {
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
}

// 빡코더 되기 열기 버튼
function open_box() {
  $("#post-box").show();
}

// 빡코더 되기 닫기 버튼
function close_box() {
  $("#post-box").hide();
}
