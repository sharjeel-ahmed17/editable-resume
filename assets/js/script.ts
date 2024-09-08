const resumeForm = document.getElementById("resume-form") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const profilePicUrlInput = document.getElementById(
  "profilePicUrl"
) as HTMLInputElement;
const profilePicUploadInput = document.getElementById(
  "profilePicUpload"
) as HTMLInputElement;
const educationInput = document.getElementById("education") as HTMLInputElement;
const workExperienceInput = document.getElementById(
  "workExperience"
) as HTMLInputElement;
const skillsInput = document.getElementById("skills") as HTMLInputElement;

const resName = document.getElementById("res-name") as HTMLElement;
const resEmail = document.getElementById("res-email") as HTMLElement;
const resPhone = document.getElementById("res-phone") as HTMLElement;
const resProfilePic = document.getElementById(
  "res-profile-pic"
) as HTMLImageElement;
const resEducationList = document.getElementById(
  "res-education-list"
) as HTMLUListElement;
const resWorkList = document.getElementById(
  "res-work-list"
) as HTMLUListElement;
const resSkillsList = document.getElementById(
  "res-skills-list"
) as HTMLUListElement;

const resumeContainer = document.querySelector(
  ".resume-container"
) as HTMLElement;

function clearList(list: HTMLUListElement) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

resumeForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  if (
    nameInput.value &&
    emailInput.value &&
    phoneInput.value &&
    educationInput.value &&
    workExperienceInput.value &&
    skillsInput.value
  ) {
    resName.textContent = nameInput.value;
    resEmail.textContent = `Email: ${emailInput.value}`;
    resPhone.textContent = `Phone: ${phoneInput.value}`;

    if (profilePicUrlInput.value) {
      resProfilePic.src = profilePicUrlInput.value;
      resProfilePic.style.display = "block";
    } else if (profilePicUploadInput.files && profilePicUploadInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target?.result) {
          resProfilePic.src = event.target.result as string;
          resProfilePic.style.display = "block";
        }
      };
      reader.readAsDataURL(profilePicUploadInput.files[0]);
    } else {
      resProfilePic.style.display = "none";
    }

    clearList(resEducationList);
    const educationArray = educationInput.value
      .split(",")
      .map((item) => item.trim());
    educationArray.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      resEducationList.appendChild(li);
    });

    clearList(resWorkList);
    const workArray = workExperienceInput.value
      .split(",")
      .map((item) => item.trim());
    workArray.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      resWorkList.appendChild(li);
    });

    clearList(resSkillsList);
    const skillsArray = skillsInput.value
      .split(",")
      .map((skill) => skill.trim());
    skillsArray.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill;
      resSkillsList.appendChild(li);
    });

    resumeContainer.style.display = "block";
  } else {
    alert("Please fill in all required fields.");
  }
});

function saveEditedContent(element: HTMLElement, storageKey: string) {
  element.addEventListener("blur", () => {
    const newValue = element.textContent || "";
    localStorage.setItem(storageKey, newValue);
    element.textContent = newValue;
  });
}

saveEditedContent(resName, "name");
saveEditedContent(resEmail, "email");
saveEditedContent(resPhone, "phone");
saveEditedContent(resEducationList, "education");
saveEditedContent(resWorkList, "workExperience");
saveEditedContent(resSkillsList, "skills");

function loadStoredContent(element: HTMLElement, storageKey: string) {
  const storedValue = localStorage.getItem(storageKey);
  if (storedValue) {
    element.textContent = storedValue;
  }
}

loadStoredContent(resName, "name");
loadStoredContent(resEmail, "email");
loadStoredContent(resPhone, "phone");
loadStoredContent(resEducationList, "education");
loadStoredContent(resWorkList, "workExperience");
loadStoredContent(resSkillsList, "skills");
