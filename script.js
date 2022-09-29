window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const synth = window.speechSynthesis;
const data = [
  {
    id: "0",
    title: "Division of Work",
    desc: "Henri believed that segregating work in the workforce amongst the worker will enhance the quality of the product. Similarly, he also concluded that the division of work improves the productivity, efficiency, accuracy and speed of the workers. This principle is appropriate for both the managerial as well as a technical work level.",
    keywords: "",
  },
  {
    id: "1",
    title: "Authority and Responsibility",
    desc: "These are the two key aspects of management. Authority facilitates the management to work efficiently, and responsibility makes them responsible for the work done under their guidance or leadership",
    keywords: "",
  },
  {
    id: "2",
    title: "Discipline",
    desc: "Without discipline, nothing can be accomplished. It is the core value for any project or any management. Good performance and sensible interrelation make the management job easy and comprehensive. Employees good behaviour also helps them smoothly build and progress in their professional careers.",
    keywords: "",
  },
  {
    id: "3",
    title: "Unity of Command",
    desc: "This means an employee should have only one boss and follow his command. If an employee has to follow more than one boss, there begins a conflict of interest and can create confusion.",
    keywords: "",
  },
  {
    id: "4",
    title: "",
    desc: "",
    keywords: "",
  },
  {
    id: "5",
    title: "",
    desc: "",
    keywords: "",
  },
  {
    id: "6",
    title: "",
    desc: "",
    keywords: "",
  },
  {
    id: "7",
    title: "",
    desc: "",
    keywords: "",
  },
  {
    id: "8",
    title: "",
    desc: "",
    keywords: "",
  },
  {
    id: "9",
    title: "",
    desc: "",
    keywords: "",
  },
  {
    id: "10",
    title: "",
    desc: "",
    keywords: "",
  },
  {
    id: "11",
    title: "",
    desc: "",
    keywords: "",
  },
  {
    id: "12",
    title: "",
    desc: "",
    keywords: "",
  },
  {
    id: "13",
    title: "",
    desc: "",
    keywords: "",
  },
];
const voiceBtn = document.getElementById("voiceBtn");
const searchInput = document.getElementById("searchInput");
const recognition = new SpeechRecognition();
const accordionDiv = document.getElementById("accordionDiv");
recognition.interimResults = true;
console.log(recognition);
addEventListener("beforeunload" , () => {
  synth.cancel()
})
addEventListener("DOMContentLoaded", () => {
  getAccordion(data);
  voiceBtn.addEventListener("click", () => {
    recognition.start();
  });
  recognition.addEventListener("start", () => {
    voiceBtn.classList.add("btn-success");
    voiceBtn.classList.remove("btn-primary");
  });
  recognition.addEventListener("end", () => {
    voiceBtn.classList.add("btn-primary");
    voiceBtn.classList.remove("btn-success");
  });
  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    searchInput.value = transcript;
    filterAccordion();
  });
  searchInput.addEventListener("input", filterAccordion);
});

function getAccordion(arr) {
  accordionDiv.innerHTML = "";
  arr.forEach(({ title, id, desc, keywords }) => {
    accordionDiv.innerHTML += `
          <div class="accordion-item my-3" id="accordionBox${id}">
          <h2 class="accordion-header" id="heading${id}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}">${title}</button>
          </h2>
          <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="headingOne"
          data-bs-parent="#accordionExample">
          <div class="accordion-body">${desc}</div>
          </div>
          </div>
      `;
  });
}

function filterAccordion() {
  synth.cancel();
  if (!searchInput.value) {
    getAccordion(data);
    return;
  }
  const filteredData = [];
  for (let i = 0; i < data.length; i++) {
    const e = data[i].title.toLowerCase();
    if (e.includes(searchInput.value.toLowerCase())) {
      filteredData.push(data[i]);
    }
  }
  getAccordion(filteredData);
  if (filteredData.length === 1) {
    speak(filteredData[0].desc);
    document.querySelector("[data-bs-toggle]").click();
  }
}

function speak(text) {
  const utt = new SpeechSynthesisUtterance(text);
  utt.pitch = 2;
  utt.rate = 1;
  utt.volume = 2;
  synth.speak(utt);
}
