import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

const FULLNAME_REGEX = /^[a-zA-ZğüşıöçİĞÜŞİÖÇ ]+$/;

const PHONE_REGEX = /^05\d{9}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta adresi zorunludur'),

  password: yup.string().required('Şifre zorunludur.'),
});

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, 'Ad Soyad en az 3 karakter olmalıdır')
    .matches(FULLNAME_REGEX, 'Ad Soyad sadece harfler ve boşluktan oluşmalıdır')

    .required('Ad Soyad zorunludur'),

  email: yup
    .string()
    .email('Geçerli bir e-posta adresi formatı giriniz')
    .required('E-posta adresi zorunludur'),

  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .matches(PASSWORD_REGEX, 'Şifre en az 1 büyük harf, 1 küçük harf ve rakam içermelidir')
    .required('Şifre zorunludur'),
});

export const InfoMembershipSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Ad Soyad zorunludur')
    .min(3, 'Ad Soyad en az 3 karakter olmalıdır')
    .matches(FULLNAME_REGEX, 'Ad Soyad sadece harflerden oluşmalıdır'),

  email: yup
    .string()
    .email('Geçerli bir e-posta adresi formatı giriniz')
    .required('E-posta adresi zorunludur'),

  phoneNumber: yup
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .matches(
      PHONE_REGEX,
      'Telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır (Örn: 05321234567)'
    ),

  birthDay: yup
    .date()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .nullable()
    .max(new Date(), 'Doğum tarihi ileri bir tarih olamaz')
    .test('age', 'Kayıt olmak için 18 yaşından büyük olmalısınız', function (value) {
      if (!value) return true;
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 18);
      return value <= cutoff;
    }),
});

export type InfoMembershipFormValues = yup.InferType<typeof InfoMembershipSchema>;

export const InfoUpdatePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Mevcut şifrenizi girmeniz gereklidir'),

  newPassword: yup
    .string()
    .required('Yeni şifre zorunludur')
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .matches(PASSWORD_REGEX, 'Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir')
    .notOneOf([yup.ref('currentPassword')], 'Yeni şifre mevcut şifre ile aynı olamaz'),

  confirmPassword: yup
    .string()
    .required('Şifre tekrarı zorunludur')
    .oneOf([yup.ref('newPassword')], 'Şifreler eşleşmiyor'),
});

export type UpdatePasswordFormValues = yup.InferType<typeof InfoUpdatePasswordSchema>;
