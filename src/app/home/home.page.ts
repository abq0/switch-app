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

  isDarkTheme: boolean;

  constructor(private router: Router, private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }


  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  phrases: string[] = [
    "ابدأ الآن! rocket", "جربها! fire", "انطلق! dash", "هيا بنا! zap", "لنبدأ! target",
    "حان الوقت! hourglass", "افعلها الآن! muscle", "ابدأ التحدي! tada", "تحرّك! runner",
    "انطلق نحو المتعة! smile", "جاهز؟ اضغط هنا! clapper", "فلنبدأ المغامرة! trophy",
    "نفّذ خطتك! memo", "أطلق الحماس! fire",
  ];

  loadingPhrases: string[] = [
    "نبحث عن الأفضل... magnifier", "جاري الاستكشاف... compass", "نحن في الطريق... rocket",
    "نبحث بكل حماس... magnifier", "قريبًا! hourglass", "نبحث الآن... detective", "البحث جارٍ... zap",
    "نستعرض الخيارات... chart", "جاري التقييم... check", "نحضر لك الأفضل... star",
    "جاري التحليل... brain", "ترقب! hourglass", "نكتشف الآن... microscope", "نعمل على إيجاد الأفضل... trophy",
    "إيجاد الحل الأمثل... gear",
  ];

  // Mapping of emojis to image URLs
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
    detective: "assets/emojis/detective.png",
    chart: "assets/emojis/chart.png",
    check: "assets/emojis/check.png",
    star: "assets/emojis/star.png",
    brain: "assets/emojis/brain.png",
    microscope: "assets/emojis/microscope.png",
    gear: "assets/emojis/gear.png",
  };

  // Function to replace emojis with <img> tags
  replacePlaceholdersWithImages(phrase: string): string {
    return phrase.replace(/\b(\w+)\b/g, (placeholder) => {
      const imgUrl = this.placeholdersToEmojis[placeholder];
      return imgUrl ? `<img src="${imgUrl}" width="20px" class="inline ms-1 mb-1" alt="${placeholder}">` : placeholder;
    });
  }

  // Function to get a random phrase
  getRandomPhrase(phraseArray: string[]): string {
    return phraseArray[Math.floor(Math.random() * phraseArray.length)];
  }

  ngOnInit() {
    this.themeService.initializeTheme();
    setTimeout(() => {
      if (this.submitBtn) {
        this.submitBtn.nativeElement.innerHTML = this.replacePlaceholdersWithImages(
          this.getRandomPhrase(this.phrases)
        );
      }
    });
  }





  getActivity(buttonType: string) {
    if (buttonType === 'submit') {
      const intensity = (document.querySelector('input[name="intensity"]:checked') as HTMLInputElement)?.value;
      const duration = (document.querySelector('input[name="duration"]:checked') as HTMLInputElement)?.value;
      const type = (document.querySelector('input[name="type"]:checked') as HTMLInputElement)?.value;

      if (!intensity || !duration || !type) {
        Swal.fire({
          text: 'الرجاء قم بتحديد جميع الخيارات',
          position: 'top',
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
        return;
      }

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
      

      if (this.submitBtn) {
        this.submitBtn.nativeElement.innerHTML = this.replacePlaceholdersWithImages(
          this.getRandomPhrase(this.phrases)
        );
      }

      const filteredActivities = activities.filter(
        (activity) =>
          activity.intensity === intensity &&
          activity.duration === duration &&
          activity.type === type
      );

      setTimeout(() => {
        if (filteredActivities.length > 0) {
          const randomActivity = filteredActivities[Math.floor(Math.random() * filteredActivities.length)];
          Swal.fire({
            text: randomActivity.activity,
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
        } else {
          Swal.fire({
            text: 'لا يوجد نشاط مقترح',
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
      }, 1500);
    } else {
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

      const intensity = ["low", "mid", "full"][Math.floor(Math.random() * 3)];
      const duration = ["5min", "10min", "10plus"][Math.floor(Math.random() * 3)];
      const type = ["internal", "external"][Math.floor(Math.random() * 2)];

      const filteredActivities = activities.filter(
        (activity) =>
          activity.intensity === intensity &&
          activity.duration === duration &&
          activity.type === type
      );

      setTimeout(() => {
        if (filteredActivities.length > 0) {
          const randomActivity = filteredActivities[Math.floor(Math.random() * filteredActivities.length)];
          Swal.fire({
            text: randomActivity.activity,
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
        } else {
          Swal.fire({
            text: 'لا يوجد نشاط مقترح',
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
      }, 1500);
    }
  }
}