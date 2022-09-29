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
    title: "Unity of Direction",
    desc: "This means an employee should have only one boss and follow his command. If an employee has to follow more than one boss, there begins a conflict of interest and can create confusion.",
    keywords: "",
  },
  {
    id: "5",
    title: "Subordination of Individual Interest",
    desc: "This indicates a company should work unitedly towards the interest of a company rather than personal interest. Be subordinate to the purposes of an organization. This refers to the whole chain of command in a company.",
    keywords: "",
  },
  {
    id: "6",
    title: "Remuneration",
    desc: "This plays an important role in motivating the workers of a company. Remuneration can be monetary or non-monetary. However, it should be according to an individual’s efforts they have made.",
    keywords: "",
  },
  {
    id: "7",
    title: "Centralization",
    desc: "In any company, the management or any authority responsible for the decision-making process should be neutral. However, this depends on the size of an organization. Henri Fayol stressed on the point that there should be a balance between the hierarchy and division of power",
    keywords: "",
  },
  {
    id: "8",
    title: "Scalar Chain",
    desc: "Fayol on this principle highlights that the hierarchy steps should be from the top to the lowest. This is necessary so that every employee knows their immediate senior also they should be able to contact any, if needed.",
    keywords: "",
  },
  {
    id: "9",
    title: "Order",
    desc: "A company should maintain a well-defined work order to have a favourable work culture. The positive atmosphere in the workplace will boost more positive productivity",
    keywords: "",
  },
  {
    id: "10",
    title: "Equity",
    desc: "All employees should be treated equally and respectfully. It’s the responsibility of a manager that no employees face discrimination.",
    keywords: "",
  },
  {
    id: "11",
    title: "Stability",
    desc: "An employee delivers the best if they feel secure in their job. It is the duty of the management to offer job security to their employees.",
    keywords: "",
  },
  {
    id: "12",
    title: "Initiative",
    desc: "The management should support and encourage the employees to take initiatives in an organization. It will help them to increase their interest and make then worth.",
    keywords: "",
  },
  {
    id: "13",
    title: "Esprit de Corps",
    desc: "It is the responsibility of the management to motivate their employees and be supportive of each other regularly. Developing trust and mutual understanding will lead to a positive outcome and work environment.",
    keywords: "",
  },
];
const voiceBtn = document.getElementById("voiceBtn");
const searchInput = document.getElementById("searchInput");
const recognition = new SpeechRecognition();
const accordionDiv = document.getElementById("accordionDiv");
recognition.interimResults = true;
console.log(recognition);
addEventListener("beforeunload", () => {
  synth.cancel();
});
addEventListener("DOMContentLoaded", () => {
  getAccordion(data);
  voiceBtn.addEventListener("click", () => {
    recognition.start();
  });
  recognition.addEventListener("start", () => {
    voiceBtn.innerText = "Speak!!"
    voiceBtn.classList.add("btn-success");
    voiceBtn.classList.remove("btn-primary");
  });
  recognition.addEventListener("end", () => {
    voiceBtn.innerText = "Voice"
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

function speak(text) {
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 1;
  utt.volume = 2;
  synth.speak(utt);
}

// git add .
// git commit -m "edited"
// git push
