// class Profile {
//   private email: string;
//   private bio: string;
//   private theme: 'LIGHT' | 'DARK';
//   private preferredLanguage: string;

//   constructor(params: {
//     email: string;
//     bio: string;
//     theme: 'LIGHT' | 'DARK';
//     preferredLanguage: string;
//   }) {
//     this.email = params.email;
//     this.bio = params.bio;
//     this.theme = params.theme;
//     this.preferredLanguage = params.preferredLanguage;
//   }

//   public updateEmail(email: string): void {
//     this.email = email;
//   }

//   public updateBio(bio: string): void {
//     this.bio = bio;
//   }

//   public toggleTheme(): void {
//     this.theme = this.theme === 'LIGHT' ? 'DARK' : 'LIGHT';
//   }

//   public updatePreferredLanguage(language: string): void {
//     this.preferredLanguage = language;
//   }

//   public getProfile() {
//     return {
//       email: this.email,
//       bio: this.bio,
//       theme: this.theme,
//       preferredLanguage: this.preferredLanguage,
//     };
//   }
// }

// const profile1 = new Profile({
//   email: 'hehe@gmail.com',
//   bio: 'I am a software engineer',
//   theme: 'LIGHT',
//   preferredLanguage: 'en',
// });

// profile1.updateBio('I am a software engineer who loves to code');

// console.log(profile1.getProfile());

class Settings {
  constructor(
    protected theme: 'LIGHT' | 'DARK',
    protected preferredLanguage: string
  ) {}

  public toggleTheme(): void {
    this.theme = this.theme === 'LIGHT' ? 'DARK' : 'LIGHT';
  }

  public updatePreferredLanguage(language: string): void {
    this.preferredLanguage = language;
  }

  public getSettings() {
    return {
      theme: this.theme,
      preferredLanguage: this.preferredLanguage,
    };
  }
}

class Profile {
  constructor(
    protected email: string,
    protected bio: string,
    protected settings: Settings
  ) {}

  public updateEmail(email: string): void {
    this.email = email;
  }

  public updateBio(bio: string): void {
    this.bio = bio;
  }

  public getProfile() {
    return {
      email: this.email,
      bio: this.bio,
      settings: this.settings.getSettings(),
    };
  }
}

const settings1 = new Settings('LIGHT', 'en');

const profile1 = new Profile(
  'nk@gmail.com',
  'I am a software engineer',
  settings1
);

profile1.updateBio('I am a software engineer who loves to code');

console.log(profile1.getProfile());
