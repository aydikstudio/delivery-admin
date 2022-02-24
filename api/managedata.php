<?php 
require 'config.php';
$permitted_chars = 'Nuok-3f9IOdSwVKTTIVgjDf2M-MUKG318a3g4UvZnVnelb0iBEl2zib3PF9NmC1YsrAe87z_ERFyD0ePhLMLtv6CjQAJYJQiMRnEPjp0tskCHmSSDsghQwcAe_Nukw2W921HP6YKDPc-Ix_nYIch5lDUA26XYIFKqckJ8sEo66TVKc-sRxvQE5gqpUANQ5itwcef0x_N';






if(isset($_POST)) {


    if($_POST['type'] == 'authSubmitted') {
        $name = trim($_POST['name']);
        $password = trim($_POST['password']);
        $query ="SELECT * FROM `users_admin` WHERE `name`='".$name."'";
        $result = mysqli_query($mysqli, $query) or die("Ошибка " . mysqli_error($mysqli)); 
        $result1 = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $check_password = password_verify($password, $result1[0]['password']);
        if($check_password) {
                echo  $result1[0]['token'];
        } else {
            echo 0;
        }
    }


    if($_POST['type'] == 'checklogin' ) {
        $status = "";
        $sql = "SELECT * FROM `users_admin` WHERE `token` = '".$_POST['token']."'";
        $query = mysqli_query($mysqli, $sql);
     
        $count = mysqli_num_rows($query);

        if($count ==  0) {
           $status = "no";
        } else {
            $status = "yes";
        }
     
      

         echo  $status;
       
    }
    
    if($_POST['type'] == 'addcategory' ) {
        $query_add = '';
        if($_POST['parent'] == 0 ) {
            
if($_FILES['downloadreportFileCategory']) {
    $img_name = rand(500000000, 150000000000000);
    $type="";
    if($_FILES['downloadreportFileCategory']['type'] == 'image/jpeg') {
        $type = ".jpg";
    }

    if($_FILES['downloadreportFileCategory']['type'] == 'image/png') {
        $type = ".png";
    }
    
    if (@copy($_FILES['downloadreportFileCategory']['tmp_name'], '../../api/img/categories/' . $img_name.$type)) {
        $query_add = "INSERT INTO `categories`(`name`,  `parent_id`, `img` ) 
        VALUES ('".$_POST['name']."', '".$_POST['parent']."', '". $img_name.$type."')";
    } else {
        echo "No";
    }
}

        } else {
            $query_add = "INSERT INTO `categories`(`name`,  `parent_id` ) 
            VALUES ('".$_POST['name']."', '".$_POST['parent']."')";
        }
    
    $res_add = mysqli_query($mysqli, $query_add);
    if($res_add) {
        echo "yes";
    }

    
    }
    



    if($_POST['type'] == 'addproduct' ) {
        $query_add = '';
        
            
if($_FILES['downloadreportFileProducts']) {
    $img_name = rand(500000000, 150000000000000);
    $type="";
    if($_FILES['downloadreportFileProducts']['type'] == 'image/jpeg') {
        $type = ".jpg";
    }

    if($_FILES['downloadreportFileProducts']['type'] == 'image/png') {
        $type = ".png";
    }

  

    
    if (@copy($_FILES['downloadreportFileProducts']['tmp_name'], '../../api/img/products/' . $img_name.$type)) {
        $query_add = "INSERT INTO `products`(`productName`,  `description`, `category_id`, `img`, `price` ) 
        VALUES ('".$_POST['name']."', '".$_POST['description']."', '".$_POST['category']."', '". $img_name.$type."', '". $_POST['price']."')";
    } else {
        echo "No";
    }
}

    $res_add = mysqli_query($mysqli, $query_add);
    if($res_add) {
        echo "yes";
    }
    }
}




if(isset($_GET)) {


    if($_GET['type'] == 'updateddata') {
        $query = "UPDATE `orders` SET summa=".$_GET['summa'].", status='".$_GET['status']."' WHERE order_number=".$_GET['id'];
        $res = mysqli_query($mysqli, $query);
         echo "yes";
    }

    if($_GET['type'] == 'allorders' ) {
        $query_add = "SELECT * FROM orders o JOIN users u ON o.user_id = u.user_id ORDER BY order_id DESC";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }


    if($_GET['type'] == 'getorder' ) {
        $query_add = "SELECT * FROM orders o JOIN users u ON o.user_id = u.user_id WHERE o.order_number = ".$_GET['id'];
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }



    if($_GET['type'] == 'getorders' ) {
        $query_add = "SELECT * FROM ordersdetail od JOIN products p ON od.product_id=p.productId   WHERE od.order_number = '".$_GET['id']."'";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }

    if($_GET['type'] == 'allgetcategories' ) {
        $query_add = "SELECT * FROM `categories`";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }


    if($_GET['type'] == 'allgetproducts' ) {
        $query_add = "SELECT * FROM `products`";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }

}


function generate_string($input, $strength = 16) {
    $input_length = strlen($input);
    $random_string = '';
    for($i = 0; $i < $strength; $i++) {
        $random_character = $input[mt_rand(0, $input_length - 1)];
        $random_string .= $random_character;
    }
 
    return $random_string;
}

?>