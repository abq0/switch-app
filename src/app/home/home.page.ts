import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { activities } from '../activities.data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild('submitBtn', { static: false }) submitBtn!: ElementRef;

  isDarkTheme: boolean;
  showActivityModal = false;
  modalVisible = false;
  selectedActivity: any = null;

  phrases: string[] = [
    "ابدأ الآن! rocket", "جربها! fire", "انطلق! dash", "هيا بنا! zap", "لنبدأ! target",
    "حان الوقت! hourglass", "افعلها الآن! muscle", "ابدأ التحدي! tada", "تحرّك! runner",
    "انطلق نحو المتعة! smile", "جاهز؟ اضغط هنا! clapper", "فلنبدأ المغامرة! trophy",
    "نفّذ خطتك! memo", "أطلق الحماس! fire"
  ];

  loadingPhrases: string[] = [
    "نبحث عن الأفضل... magnifier", "جاري الاستكشاف... compass", "نحن في الطريق... rocket",
    "نبحث بكل حماس... magnifier", "قريبًا! hourglass", "نبحث الآن... magnifier", "البحث جارٍ... zap",
    "نستعرض الخيارات... chart", "جاري التقييم... check", "نحضر لك الأفضل... star",
    "جاري التحليل... brain", "ترقب! hourglass", "نكتشف الآن... microscope", "نعمل على إيجاد الأفضل... trophy",
    "إيجاد الحل الأمثل... gear"
  ];

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
    gear: "assets/emojis/gear.png"
  };

  constructor(private router: Router, private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  ngOnInit(): void {
    this.themeService.initializeTheme();
    setTimeout(() => this.updateSubmitButton());
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  replacePlaceholdersWithImages(phrase: string): string {
    return phrase.replace(/\b(\w+)\b/g, (placeholder) => {
      const imgUrl = this.placeholdersToEmojis[placeholder];
      return imgUrl ? `<img src="${imgUrl}" width="20px" class="inline ms-1 mb-1" alt="${placeholder}">` : placeholder;
    });
  }

  getRandomPhrase(phraseArray: string[]): string {
    return phraseArray[Math.floor(Math.random() * phraseArray.length)];
  }

  updateSubmitButton(): void {
    if (this.submitBtn) {
      this.submitBtn.nativeElement.innerHTML = this.replacePlaceholdersWithImages(
        this.getRandomPhrase(this.phrases)
      );
    }
  }

  validateFormInputs(): boolean {
    const intensity = (document.querySelector('input[name="intensity"]:checked') as HTMLInputElement)?.value;
    const duration = (document.querySelector('input[name="duration"]:checked') as HTMLInputElement)?.value;
    const type = (document.querySelector('input[name="type"]:checked') as HTMLInputElement)?.value;
    return !!intensity && !!duration && !!type;
  }

  getRandomActivity(intensity: string, duration: string, type: string): any {
    const filteredActivities = activities.filter(
      (activity) =>
        activity.intensity === intensity &&
        activity.duration === duration &&
        activity.type === type
    );

    return filteredActivities.length > 0
      ? filteredActivities[Math.floor(Math.random() * filteredActivities.length)]
      : null;
  }

  handleActivitySearch(isRandom: boolean): void {
    let intensity: string;
    let duration: string;
    let type: string;

    if (isRandom) {
      intensity = ["low", "mid", "full"][Math.floor(Math.random() * 3)];
      duration = ["5min", "10min", "10plus"][Math.floor(Math.random() * 3)];
      type = ["internal", "external"][Math.floor(Math.random() * 2)];
    } else {
      if (!this.validateFormInputs()) {
        this.showResultAlert('الرجاء قم بتحديد جميع الخيارات');
        return;
      }

      intensity = (document.querySelector('input[name="intensity"]:checked') as HTMLInputElement).value;
      duration = (document.querySelector('input[name="duration"]:checked') as HTMLInputElement).value;
      type = (document.querySelector('input[name="type"]:checked') as HTMLInputElement).value;
    }

    this.updateSubmitButton();

    setTimeout(() => {
      const activity = this.getRandomActivity(intensity, duration, type);
      if (activity) {
        this.selectedActivity = activity;
        this.showActivityModal = true;
        setTimeout(() => {
          this.modalVisible = true;
        }, 10);
      } else {
        this.showResultAlert('لا يوجد نشاط مقترح');
      }
    }, 500);
  }

  getActivity(buttonType: string): void {
    this.handleActivitySearch(buttonType !== 'submit');
  }

  closeActivityModal(): void {
    this.modalVisible = false;
    setTimeout(() => {
      this.showActivityModal = false;
    }, 300);
  }

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
}
