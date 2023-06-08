let user = {
  name: "",
  password: "",
  income: 0,
  money: 0,
  inATM: true,
  blockCount: 0,
  credit: false,
  creditMoney: 0,
};
let transactions = "";
let counter = 1;
do {
  let login = confirm("Hesabiniz var? (beli daxil ol, qeydiyyat yoxdur): ");
  if (login) {
    do {
      let userName = prompt("Adinizi daxil edin: ");
      let userPassword = prompt("Shifrenizi daxil edin: ");
      if (user.name === userName && userPassword === user.password) {
        while (user.inATM) {
          let cash = confirm(`Xosh geldiniz ${user.name}.
          Nağd pul cixarin ve ya kredit odeyin? (beli-nagd pul, odenishsiz kredit):
                `);
          if (cash) {
            while (cash) {
              let userConfirm = confirm(`Cari pulunuz: ${user.money}. 
              Nagd pul cixarmaq isteyirsiniz? (beli/xeyir)`);
              if (userConfirm) {
                if (user.money === 0) {
                  credit = confirm(
                    `Cari pulunuz: ${user.money}
                    Kredit isteyirsiniz? (beli/xeyir):`
                  );
                  if (credit) {
                    if (user.credit === true) {
                      alert(
                        `Artiq kreditiniz var: ${user.creditMoney} AZN. Odenish edin, sonra yeni kredit goturun.`
                      );
                      break;
                    } else {
                      user.credit = true;
                      user.creditMoney = ((user.income * 45) / 100) * 12;
                      user.money += user.creditMoney - 0.02 * user.creditMoney;
                      transactions += `${counter}. Mebleg: ${
                        user.creditMoney
                      } AZN  ${Date()} (Kredit daxil edilib) \n`;
                      counter++;
                      continue;
                    }
                  } else {
                    alert("Pulunuz yoxdur, Gelen ay goruseriy.");
                    user.inATM = false;
                    break;
                  }
                }
                let cashOut = Number(
                  prompt(`Cari pulunuz: ${user.money}. 
                  Ne qeder pul cixarmaq isteyirsiz: `)
                );
                while (!cashOut || cashOut == "") {
                  cashOut = Number(
                    prompt(`Cari pulunuz: ${user.money}. 
                    Ne qeder pul cixarmaq isteyirsiz: `)
                  );
                }
                if (cashOut > user.money) {
                  credit = confirm(
                    `Cari pulunuz: ${user.money}
                    Kredit isteyirsiniz? (beli/xeyir):`
                  );
                  if (credit) {
                    if (user.credit === true) {
                      alert(
                        `Artiq kreditiniz var: ${user.creditMoney} AZN. Odenish edin, sonra yeni kredit goturun.`
                      );
                      break;
                    } else {
                      user.credit = true;
                      user.creditMoney = ((user.income * 45) / 100) * 12;
                      user.money += user.creditMoney - 0.02 * user.creditMoney;
                      transactions += `${counter}. Mebleg: ${
                        user.creditMoney
                      } AZN  ${Date()} (Kredit daxil edilib) \n`;
                      counter++;
                      continue;
                    }
                  } else {
                    alert("Pulu cixardin.");
                  }
                } else {
                  user.money -= cashOut;
                  transactions += `${counter}. Mebleg: ${cashOut} AZN  ${Date()} (Pul cixarilib) \n`;
                  counter++;
                  break;
                }
              } else {
                alert(transactions);
                user.inATM = false;
                break;
              }
            }
            continue;
          } else {
            if (user.creditMoney === 0) {
              alert("Sizin kreditiniz yoxdur");
              continue;
            }
            while (!cash) {
              let userConfirm = confirm(`Cari pulunuz: ${user.money}. 
              Cari kreditiniz: ${user.creditMoney}.
              Kredit odemek isteyirsiniz? (beli/xeyir)`);
              if (userConfirm) {
                let payMoney = Number(
                  prompt(`Cari pulunuz: ${user.money}. 
                  Cari kreditiniz: ${user.creditMoney}.
                  Ne qeder pul odemek isteyirsiz: `)
                );
                while (!payMoney || payMoney == "") {
                  payMoney = Number(
                    prompt(`Cari pulunuz: ${user.money}. 
                    Cari kreditiniz: ${user.creditMoney}.
                    Ne qeder pul odemek isteyirsiz: `)
                  );
                }
                if (user.money === 0) {
                  alert("Pulunuz yoxdur, Gelen ay goruseriy.");
                  user.inATM = false;
                  break;
                } else {
                  if (payMoney > user.money) {
                    alert(`Sizin ${payMoney} AZN yoxdur, yeniden cehd ele.`);
                    continue;
                  } else {
                    user.money -= payMoney;
                    user.creditMoney -= payMoney;
                    transactions += `${counter}. Mebleg: ${payMoney} AZN  ${Date()} (Kredit odenishi olub) \n`;
                    counter++;
                    alert("Siz ugurla odenish etdiniz.");
                    if (user.creditMoney === 0) {
                      user.credit = false;
                    }
                    break;
                  }
                }
              } else {
                alert(transactions);
                user.inATM = false;
                break;
              }
            }
          }
        }
      } else {
        let register = confirm(
          "İstifadəci adiniz ve ya parolunuz sehvdir, yeniden cehd edin ve ya qeydiyyatdan keçin (yeniden cehd etmek, qeydiyyatdan kecmek): "
        );
        if (!register) {
          user.blockCount += 1;
          if (user.blockCount === 3) {
            alert("Siz 3 defe sehv etdiniz, bloklanmisiniz.");
            user.inATM = false;
          } else {
            continue;
          }
        } else {
          user.name = prompt("Qeydiyyatdan kecin. Adinizi daxil edin: ");
          while (user.name == "") {
            user.name = prompt("Adinizi daxil edin: ");
          }
          user.password = prompt("Shifrenizi daxil edin: ");
          while (user.password == "") {
            user.password = prompt("Shifrenizi daxil edin: ");
          }
          user.income = Number(prompt("Gelirinizi daxil edin: "));
          while (!user.income || user.income == "") {
            user.income = Number(prompt("Gelirinizi daxil edin: "));
          }
          user.money = user.income;
        }
      }
    } while (user.inATM);
  } else {
    user.name = prompt("Qeydiyyatdan kecin. Adinizi daxil edin: ");
    while (user.name == "") {
      user.name = prompt("Adinizi daxil edin: ");
    }
    user.password = prompt("Shifrenizi daxil edin: ");
    while (user.password == "") {
      user.password = prompt("Shifrenizi daxil edin: ");
    }
    user.income = Number(prompt("Gelirinizi daxil edin: "));
    while (!user.income || user.income == "") {
      user.income = Number(prompt("Gelirinizi daxil edin: "));
    }
    user.money = user.income;
  }
} while (user.inATM);
