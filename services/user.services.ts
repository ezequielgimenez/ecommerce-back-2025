import { User, Auth } from "models/associations";
import { addMinutes } from "date-fns";
import seedRandom from "random-seed";

export async function createUserAuth(email: string) {
  const emailModified = email.trim().toLowerCase();
  const expires = addMinutes(new Date(), 30);
  const randomNum = seedRandom.create();
  const code = randomNum.intBetween(1000, 9999);

  const [user, userCreated] = await User.findOrCreate({
    where: { email: emailModified },
    defaults: { email: emailModified },
  });

  if (userCreated) {
    await Auth.create({
      email: emailModified,
      code,
      expires,
      userId: user.get("id"),
    });
    return {
      success: true,
      message: "User creado, verifica el codigo que te enviamos al correo",
      code,
    };
  } else {
    await Auth.update({ code, expires }, { where: { email: emailModified } });
    return {
      success: true,
      message: "Verifica el codigo que te enviamos al correo",
      code,
    };
  }
}

export async function findOneUserById(id: string) {
  const user = await User.findOne({ where: { id } });
  return user;
}

export async function findOneUserByPk(id: number) {
  const user = await User.findByPk(id);
  return user;
}
export async function findOneUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

type dataUpdate = {
  name: string;
  surname: string;
  address: {
    street_name: string;
    street_number: number;
  };
};

export async function updateUserById(data: dataUpdate, id: string) {
  const user = await User.update(data, { where: { id } });
  return user;
}
