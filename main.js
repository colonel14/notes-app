const addBox = document.querySelector(".add-box");
const popup = document.querySelector(".popup-box");
const closeIcon = popup.querySelector("i");
const titleTag = document.getElementById("title");
const popupTitle = popup.querySelector("h3");
const descTag = document.getElementById("desc");
const addBtn = document.querySelector("button");

// Show & Close Popup Form
addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popup.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  popup.classList.remove("show");
  titleTag.value = descTag.value = "";
});

let isUpdate = false;
let updateId;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// console.log(notes);

function showMenu(elem) {
  elem.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target != elem) {
      elem.classList.remove("show");
    }
  });
}

function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((item, id) => {
    let note = `
        <li class="note">
            <div class="note-details">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
            <div class="note-footer">
                <span>${item.date}</span>
                <div class="settings" onclick="showMenu(this)">
                    <i class="fa-solid fa-ellipsis"></i>
                    <ul class="settings-menu">
                    <li onclick="updateNote(${id}, '${item.title}', '${item.description}')">
                        <i class="fa-solid fa-pen-to-square"></i>
                        Edit
                    </li>
                    <li onclick="deleteNote(${id})">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </li>
                    </ul>
                </div>
            </div>
        </li>
        `;
    addBox.insertAdjacentHTML("afterend", note);
  });
}

showNotes();

function updateNote(noteId, title, desc) {
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  popupTitle.innerHTML = "Update note";
  addBtn.innerHTML = "Update Note";
  titleTag.value = title;
  descTag.value = desc;
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim();
  let description = descTag.value.trim();

  if (title || desc) {
    let currentDate = new Date();
    let month = months[currentDate.getMonth()];
    let day = currentDate.getDay();
    let year = currentDate.getFullYear();

    let noteInfo = { title, description, date: `${month} ${day}, ${year}` };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  showNotes();
  closeIcon.click();
});
