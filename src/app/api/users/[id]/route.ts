import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// update data
export async function PATCH(request, {params}) {
  // Convert the id parameter from string to integer
  const id = parseInt(params.id);
  const { name, email } = await request.json();
  const updateResponse = await prisma.user.update({
    where: { id },
    data: { name, email },
  });

  if (!updateResponse) {
    return NextResponse.json(
      {
        sucess: false,
        message: "not sucess update data",
        data: null,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      sucess: true,
      message: "berhasil update data",
      data: updateResponse
    },
    {
      status: 200,
    }
  );
}

// Delete user
export async function DELETE(request, {params}) {
    try {
        const id = parseInt(params.id);
        await prisma.user.delete({
            where: {id}
        })

        return NextResponse.json({
            sucess: true,
            message: `berhasil hapus data ${id}` 
        }, {
            status: 200
        })
    } catch (error) {
        console.error('failed to delete user', error);
        return NextResponse.json({
            sucess: false,
            message: 'failed to delete user',
            error: error.message
        })
    }
}


// GUNAKAN YG INI'

// export async function GET(request, {params}) {
//     const id = parseInt(params.id)
//     const getResponse = await prisma.user.findUnique({
//         where: {id}
//     })

//     if (!getResponse) {
//         return NextResponse.json({
//             sucess: true,
//             message: 'Detail data not found',
//             data: null
//         }, {
//             status: 400
//         })
//     }

//     return NextResponse.json({
//         sucess: true,
//         message: 'data found!',
//         data: getResponse,
//     },{
//         status: 200
//     })
// }

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          sucess: false,
          message: "Invalid ID format, must a number",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    const getResponse = await prisma.user.findUnique({
      where: { id },
    });

    if (!getResponse) {
      return NextResponse.json(
        {
          sucess: false,
          message: "user not found",
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        sucess: true,
        message: "succeded fetching Id User",
        data: getResponse,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("failed fetching data", error);
    return NextResponse.json(
      {
        sucess: false,
        message: "failed to fetch id",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

