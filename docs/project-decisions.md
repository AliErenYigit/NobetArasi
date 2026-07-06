# Proje Kararları

## Uygulama Adı

Nöbet Arası

## Hedef Kullanıcı

İntern döneminde olan ve TUS sınavına hazırlanan kişiler.

## İlk Kullanım Senaryosu

Kullanıcı nöbet arasında veya kısa boşluklarda telefonundan uygulamaya girer, kategori seçer, 10 soruluk quiz çözer ve XP kazanır.

## İlk MVP Özellikleri

- Email/şifre ile kullanıcı girişi
- 4 kategori
- 10 soruluk quiz
- Sonuç ekranı
- XP kazanımı
- Level gösterimi

## İlk MVP'de Olmayacaklar

- Leaderboard
- Multiplayer
- Push notification
- Offline mod
- Admin panel
- Premium üyelik
- Ödeme sistemi
- Klinik vaka modu
- Boss savaşı
- Rozet sistemi

## İlk Kategoriler

- Mikrobiyoloji
- Farmakoloji
- Patoloji
- Dahiliye

## Güvenlik Kararları

- Şifreler hashlenerek saklanacak.
- JWT secret Git'e gönderilmeyecek.
- Database connection string Git'e gönderilmeyecek.
- Kullanıcının kazandığı XP backend tarafında hesaplanacak.
- Kullanıcı doğrudan XP değeri gönderemeyecek.
- Mobil uygulama sadece seçilen cevapları backend'e gönderecek.
- Backend doğru/yanlış sayısını kendisi hesaplayacak.