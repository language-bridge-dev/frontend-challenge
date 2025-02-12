# Frontend Engineer Technical Test

Welcome to this technical test! The main goal is to demonstrate your **frontend development** skills, best coding practices, **responsiveness**, **accessibility**, and overall ability to build maintainable and scalable applications.

<p align="center">
  <img src="https://github.com/user-attachments/assets/b7dbdaa4-2973-4117-8c8b-7991150ab853" width="40%" />
  <img src="https://github.com/user-attachments/assets/1293b31c-fded-4320-8892-77a2a1693ab9" width="40%" />
</p>

## Overview

You are required to implement a **photo gallery** that populates with images taken via the user’s camera. Specifically:
1. **Camera Usage**  
   - Provide a button (e.g., “Start Camera”) that activates the user’s camera.  
   - Use the [MediaDevices getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) API (or an equivalent approach) to capture images.
   - Once the camera is active, include an additional Take Photo button. This button should capture the current frame from the camera stream when clicked.

2. **Photo Gallery**  
   - Display the captured photos in **thumbnails on the left side** of the page (or in a dedicated panel/section).
   - Implement **pagination** for the gallery. Only a limited number of thumbnails should be shown on each page (e.g., 6 or 9), with the ability to navigate forward and backward.
   - (Optional) When a thumbnail is clicked, you can showcase the photo in a larger view.

3. **Design & Layout**  
   - The interface should be **responsive** and adapt well to different screen sizes (mobile, tablets, desktop).
   - **Accessibility** is important (use semantic HTML tags, `alt` attributes, `aria-` labels, etc.).

4. **Best Practices**  
   - Use a **component-based** approach or any architectural pattern you consider appropriate (e.g., MVC, functional components, etc.).
   - Keep your code clean, readable, and well-organized.
   - Handle errors properly, including camera permission issues.
   - Provide basic documentation (in code or in the README) explaining technical decisions.

## Technical Requirements

- You must use React as a framework.
- Feel free to use any package manager (npm, yarn, pnpm).
- Your application must be runnable locally with clear instructions.

## Evaluation Criteria

- **Functionality**  
  - Does the application successfully capture images from the camera?  
  - Are the images stored and displayed in a paginated gallery?

- **Code Quality**  
  - Readability, cleanliness, and organization.  
  - Use of standards and best practices (naming, folder structure, etc.).

- **Design & Usability**  
  - Does the interface meet the requirements?  
  - Is it responsive and accessible?

- **Documentation**  
  - Clear instructions on how to clone, install, and run the project locally.  
  - Notes on any significant technical decisions.

## How to Submit

1. **Fork** this repository.  
2. Create a new branch named after you (e.g., `feature/your-name`).  
3. Implement your solution on that branch.  
4. **Include instructions** in the README (or a separate file) describing how to run the project:
   - How to install dependencies.  
   - How to start the local development server (or open an HTML file if no server is used).  
   - Any special configurations needed.
5. **Create a Pull Request** back to this repository from your fork. In the PR description, provide a brief overview of how to test your solution.

## Delivery

- Ideally, submit your PR within **1-2 days**.  
- If you need more time or have any questions, please reach out.

## Optional Extras

- State management (Redux, Context API, etc.) if relevant to your chosen stack.
- Storing photos in LocalStorage or IndexedDB so they persist upon page reload.
- Basic unit or integration tests.
- Additional UI/UX details (animations, camera preview features, etc.).

---
### Documents

- Screenshots or additional documentation can also be placed in a `docs/` folder (e.g., `docs/screenshots/`) if needed.

---

**Thank you for participating!**  
We look forward to reviewing your Pull Request and seeing how you approach this technical test. Good luck!
