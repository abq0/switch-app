import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { activities } from '../activities.data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage {
  @ViewChild('submitBtn', { static: false }) submitBtn!: ElementRef;

  phrases: string[] = [
    "ابدأ الآن! 🚀", "جربها! 🔥", "انطلق! 💨", "هيا بنا! ⚡", "لنبدأ! 🎯",
    "حان الوقت! ⏳", "افعلها الآن! 💪", "ابدأ التحدي! 🎉", "تحرّك! 🏃‍♂️",
    "انطلق نحو المتعة! 😃", "جاهز؟ اضغط هنا! 🎬", "فلنبدأ المغامرة! 🏆",
    "نفّذ خطتك! 📝", "أطلق الحماس! 🔥",
  ];

  loadingPhrases: string[] = [
    "نبحث عن الأفضل... 🔍", "جاري الاستكشاف... 🧭", "نحن في الطريق... 🚀",
    "نبحث بكل حماس... 🔎", "قريبًا! ⏳", "نبحث الآن... 🕵️‍♂️", "البحث جارٍ... ⚡",
    "نستعرض الخيارات... 📊", "جاري التقييم... ✔️", "نحضر لك الأفضل... 🌟",
    "جاري التحليل... 🧠", "ترقب! ⏳", "نكتشف الآن... 🔬", "نعمل على إيجاد الأفضل... 🏆",
    "إيجاد الحل الأمثل... ⚙️",
  ];


  constructor() { }

  getRandomPhrase(phraseArray: string[]): string {
    return phraseArray[Math.floor(Math.random() * phraseArray.length)];
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.submitBtn) {
        this.submitBtn.nativeElement.textContent = this.getRandomPhrase(this.phrases);
      }
    });
  }

  getActivity() {
    Swal.fire({
      title: "<img src='assets/race.svg'>",
      text: this.getRandomPhrase(this.loadingPhrases),
      showConfirmButton: false,
      backdrop: "rgba(0,0,0,0.1)",
      allowOutsideClick: false
    });

    if (this.submitBtn) {
      this.submitBtn.nativeElement.textContent = this.getRandomPhrase(this.phrases);
    }

    const intensity = (document.querySelector('input[name="intensity"]:checked') as HTMLInputElement)?.value;
    const duration = (document.querySelector('input[name="duration"]:checked') as HTMLInputElement)?.value;
    const type = (document.querySelector('input[name="type"]:checked') as HTMLInputElement)?.value;

    const filteredActivities = activities.filter(
      activity => activity.intensity === intensity && activity.duration === duration && activity.type === type
    );

    setTimeout(() => {
      if (filteredActivities.length > 0) {
        const randomActivity = filteredActivities[Math.floor(Math.random() * filteredActivities.length)];
        Swal.fire({
          title: "<img src='assets/start.svg'>",
          text: randomActivity.activity,
          showConfirmButton: false,
          backdrop: "rgba(0,0,0,0.1)",
        });
      } else {
        Swal.fire({
          title: "<img src='assets/broke.svg'>",
          text: 'لا يوجد نشاط مقترح',
          showConfirmButton: false,
          backdrop: "rgba(0,0,0,0.1)",
        });
      }
    }, 1500);
  }

}
