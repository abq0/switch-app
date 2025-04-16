import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { activities } from '../activities.data';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild('submitBtn', { static: false }) submitBtn!: ElementRef;

  isDarkTheme: boolean; // Tracks current theme state (true = dark, false = light)

  // Phrases for different states of the application
  phrases: string[] = [ // Random phrases for the main button
    "ابدأ الآن! rocket", "جربها! fire", "انطلق! dash", "هيا بنا! zap", "لنبدأ! target",
    "حان الوقت! hourglass", "افعلها الآن! muscle", "ابدأ التحدي! tada", "تحرّك! runner",
    "انطلق نحو المتعة! smile", "جاهز؟ اضغط هنا! clapper", "فلنبدأ المغامرة! trophy",
    "نفّذ خطتك! memo", "أطلق الحماس! fire",
  ];

  loadingPhrases: string[] = [ // Phrases for loading states
    "نبحث عن الأفضل... magnifier", "جاري الاستكشاف... compass", "نحن في الطريق... rocket",
    "نبحث بكل حماس... magnifier", "قريبًا! hourglass", "نبحث الآن... magnifier", "البحث جارٍ... zap",
    "نستعرض الخيارات... chart", "جاري التقييم... check", "نحضر لك الأفضل... star",
    "جاري التحليل... brain", "ترقب! hourglass", "نكتشف الآن... microscope", "نعمل على إيجاد الأفضل... trophy",
    "إيجاد الحل الأمثل... gear",
  ];

  // Mapping of emoji placeholders to their image URLs
  placeholdersToEmojis: { [key: string]: string } = {
    rocket: "assets/emojis/rocket.png",
    fire: "assets/emojis/fire.png",
    dash: "assets/emojis/dash.png",
    zap: "assets/emojis/zap.png",
    target: "assets/emojis/target.png",
    hourglass: "assets/emojis/hourglass.png",
    muscle: "assets/emojis/muscle.png",
    tada: "assets/emojis/tada.png",
    runner: "assets/emojis/runner.png",
    smile: "assets/emojis/smile.png",
    clapper: "assets/emojis/clapper.png",
    trophy: "assets/emojis/trophy.png",
    memo: "assets/emojis/memo.png",
    magnifier: "assets/emojis/magnifier.png",
    compass: "assets/emojis/compass.png",
    chart: "assets/emojis/chart.png",
    check: "assets/emojis/check.png",
    star: "assets/emojis/star.png",
    brain: "assets/emojis/brain.png",
    microscope: "assets/emojis/microscope.png",
    gear: "assets/emojis/gear.png",
  };

  constructor(private router: Router, private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  /**
   * Navigates to the settings page
   */
  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  /**
   * Replaces emoji placeholders in text with <img> tags
   * @param phrase The input string containing placeholders
   * @returns String with placeholders replaced by image tags
   */
  replacePlaceholdersWithImages(phrase: string): string {
    return phrase.replace(/\b(\w+)\b/g, (placeholder) => {
      const imgUrl = this.placeholdersToEmojis[placeholder];
      return imgUrl ? `<img src="${imgUrl}" width="20px" class="inline ms-1 mb-1" alt="${placeholder}">` : placeholder;
    });
  }

  /**
   * Gets a random phrase from the provided array
   * @param phraseArray Array of phrases to choose from
   * @returns A randomly selected phrase
   */
  getRandomPhrase(phraseArray: string[]): string {
    return phraseArray[Math.floor(Math.random() * phraseArray.length)];
  }

  /**
   * Updates the submit button with a random phrase and emoji images
   */
  updateSubmitButton(): void {
    if (this.submitBtn) {
      this.submitBtn.nativeElement.innerHTML = this.replacePlaceholdersWithImages(
        this.getRandomPhrase(this.phrases)
      );
    }
  }

  /**
   * Shows a loading alert with a random loading phrase
   * @returns The Swal instance for further chaining if needed
   */
  showLoadingAlert() {
    Swal.fire({
      html: this.replacePlaceholdersWithImages(this.getRandomPhrase(this.loadingPhrases)),
      position: 'top',
      backdrop: "rgba(0,0,0,0.1)",
      showClass: {
        popup: `
        dark:bg-gray-800
        dark:text-white
        animate__animated
        animate__fadeInDown
        animate__faster
      `,
      },
      hideClass: {
        popup: `
        dark:bg-gray-800
        dark:text-white
        animate__animated
        animate__fadeOutUp
        animate__faster
      `,
      },
      grow: 'row',
      showConfirmButton: false,
      showCloseButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  }

  /**
   * Shows a result alert with the provided text
   * @param text The text to display in the alert
   */
  showResultAlert(text: string): void {
    Swal.fire({
      text,
      position: 'top',
      backdrop: "rgba(0,0,0,0.1)",
      showClass: {
        popup: `
        dark:bg-gray-800
        dark:text-white
        animate__animated
        animate__fadeInDown
        animate__faster
      `,
      },
      hideClass: {
        popup: `
        dark:bg-gray-800
        dark:text-white
        animate__animated
        animate__fadeOutUp
        animate__faster
      `,
      },
      grow: 'row',
      showConfirmButton: false,
      showCloseButton: false,
    });
  }

  /**
   * Validates if all required form inputs are selected
   * @returns True if all inputs are selected, false otherwise
   */
  validateFormInputs(): boolean {
    const intensity = (document.querySelector('input[name="intensity"]:checked') as HTMLInputElement)?.value;
    const duration = (document.querySelector('input[name="duration"]:checked') as HTMLInputElement)?.value;
    const type = (document.querySelector('input[name="type"]:checked') as HTMLInputElement)?.value;
    return !!intensity && !!duration && !!type;
  }

  /**
   * Gets a random activity based on the provided criteria
   * @param intensity Activity intensity level
   * @param duration Activity duration
   * @param type Activity type
   * @returns A random activity matching the criteria or null if none found
   */
  getRandomActivity(intensity: string, duration: string, type: string): string | null {
    const filteredActivities = activities.filter(
      (activity) =>
        activity.intensity === intensity &&
        activity.duration === duration &&
        activity.type === type
    );

    return filteredActivities.length > 0
      ? filteredActivities[Math.floor(Math.random() * filteredActivities.length)].activity
      : null;
  }

  /**
   * Handles the activity search process
   * @param isRandom Whether to use random criteria or form inputs
   */
  handleActivitySearch(isRandom: boolean): void {
    // Show loading alert
    this.showLoadingAlert();

    // Get search criteria
    let intensity: string;
    let duration: string;
    let type: string;

    if (isRandom) {
      // Use random criteria
      intensity = ["low", "mid", "full"][Math.floor(Math.random() * 3)];
      duration = ["5min", "10min", "10plus"][Math.floor(Math.random() * 3)];
      type = ["internal", "external"][Math.floor(Math.random() * 2)];
    } else {
      // Use form inputs
      if (!this.validateFormInputs()) {
        this.showResultAlert('الرجاء قم بتحديد جميع الخيارات');
        return;
      }
      intensity = (document.querySelector('input[name="intensity"]:checked') as HTMLInputElement).value;
      duration = (document.querySelector('input[name="duration"]:checked') as HTMLInputElement).value;
      type = (document.querySelector('input[name="type"]:checked') as HTMLInputElement).value;
    }

    // Update submit button
    this.updateSubmitButton();

    // Show result after delay
    setTimeout(() => {
      const activity = this.getRandomActivity(intensity, duration, type);
      this.showResultAlert(activity || 'لا يوجد نشاط مقترح');
    }, 1500);
  }

  /**
   * Handles button click events
   * @param buttonType The type of button clicked ('submit' or other)
   */
  getActivity(buttonType: string): void {
    this.handleActivitySearch(buttonType !== 'submit');
  }

  /**
   * Angular lifecycle hook - initializes the component
   */
  ngOnInit(): void {
    this.themeService.initializeTheme();
    setTimeout(() => this.updateSubmitButton());
  }
}