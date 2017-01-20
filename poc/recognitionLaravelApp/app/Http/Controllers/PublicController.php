<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Character;

class PublicController extends Controller
{
    public function index(){
        return view("index");
    }

    public function storePicture(Request $request){
        $data = $request->dataURI;

        list($type, $data) = explode(';', $data);
        list(, $data)      = explode(',', $data);
        $data = base64_decode($data);


        $newOriginalName = rtrim(base64_encode(md5(microtime())), "=");
        file_put_contents('../resources/images/'.$newOriginalName.'.jpg', $data);
        $newGrayScaleName = $newOriginalName . "+";
        $command = 'python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\grayScaler.py '.$newOriginalName . " " . $newGrayScaleName;
        exec($command, $output);

        if($output[0] == "success"){
            //unlink('../resources/images/'. $newOriginalName . ".jpg");
            $allCharacters = Character::get();
            $smallest = 200000;
            $values = [];
            $name = "";
            foreach ($allCharacters as $character){
                $command = 'python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\imageComparison.py '. $character->dataUrl . " " . $newGrayScaleName;
                $output = null;
                exec($command, $output);
                if($output[0] < $smallest)
                {
                    $smallest = $output[0];
                    $name = $character->name;
                    $values[0] = $name;

                }
                $char = [];
                $char[0] = $character->name;
                $char[1] = $output[0];
                array_push($values, $char);

            }

            //return $wrongValues;
            unlink('../resources/images/'. $newGrayScaleName . ".png");
            return $values;

            //when doesn't work do this to see error
            //exec('python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\test.py capt0001 2>&1', $output);
        }



    }public function comparePictureOpenCv(Request $request){
        $data = $request->dataURI;
        list($type, $data) = explode(';', $data);
        list(, $data)      = explode(',', $data);
        $data = base64_decode($data);
        $newOriginalName = rtrim(base64_encode(md5(microtime())), "=");
        file_put_contents('../resources/images/'.$newOriginalName.'.jpg', $data);

        $command = 'python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\opencvRecognition.py '.$newOriginalName . " 2>&1";
        exec($command, $output);
        
        unlink('../resources/images/'. $newOriginalName . ".jpg");
        
        return $output;
       
        //when doesn't work do this to see error
        //exec('python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\test.py capt0001 2>&1', $output);
        



    }

    public function newName(Request $request){
        $newName = $request->name;
        $data = $request->dataURI;
        list($type, $data) = explode(';', $data);
        list(, $data)      = explode(',', $data);
        $data = base64_decode($data);
        $newOriginalName = rtrim(base64_encode(md5(microtime())), "=");
        $newGrayScaleName = $newOriginalName . "+";
        file_put_contents('../resources/images/'.$newOriginalName.'.jpg', $data);
        $command = 'python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\grayScaler.py '.$newOriginalName . " " . $newGrayScaleName;
        exec($command, $output);
        if($output[0] == "success"){
            unlink('../resources/images/'. $newOriginalName . ".jpg");
            $newCharacer = new Character();
            $newCharacer->name = $newName;
            $newCharacer->dataUrl = $newGrayScaleName;
            $newCharacer->save();
            return "success";
        }

        return "fail";

    }

    public function test(){
        $allCharacters = Character::get();
        return $allCharacters;
    }

    public function pythonTest(){

        $command = 'python C:\Users\seppe\Documents\virtualHosts\sepperenty\recognitionLaravelApp\app\imageComparison.py '. "image1" . " " . "ZWU0NWUzNDcwZTA3MWM1YWE2NmUxNWUwOWI0NWZkNzY+" . " 2>&1";

        exec($command, $output);
        return $output;
    }

    public function randomCharacters(){

        for ($i = 0; $i<100; $i++){
            $characters = ["Homer Simpson", "Marge Simpson", "Lisa Simpson", "Bart Simpson"];
            $random = rand(0,3);
            $newName = $characters[$random];

            $newImage = "image1";

            if($newName == $characters[0]){
                $images = ["image1", "MmEwYmIxODc4YjEzODNjM2I4OGQxMzViZDZiZmU3NmQ+", "MzQwOTljZmMzMDIyOWVkNTYwN2M5MDYzMDJhOWMwZjc+", "ZDA1ZDMwMjUyYmRmNmM0ZjExYWVlMTAzNDVjMmRjOGI+"];
                $imRandom = rand(0,3);
                $newImage = $images[$imRandom];
            }elseif($newName == $characters[1]){
                $images = ["image2", "NDQ2ZDNhZDZmNzc5MGVhNjBhNjgyYjdjMGM5YWYyMjQ+"];
                $imRandom = rand(0,1);
                $newImage = $images[$imRandom];
            }elseif($newName == $characters[2]){
                $images = ["image3", "M2U4ZmY1MjY5YjI5N2FhNGJkMmYyMTdiYzZiNmYxMzc+", "NDBmOTM5N2NjODMyY2VmOGY4OWJkNzNkN2VhM2NlNmQ+", "Yzk3ZjI4MjI5ZjhkMDRhMjFkYjI3MGNmMDM1OWM5ODU+", "ZWNjMTJmODVlMjAyNWVmNDdlZmI2MWEwZThjZDM0NGQ+"];
                $imRandom = rand(0,4);
                $newImage = $images[$imRandom];
            }elseif($newName == $characters[3]){
                $images = ["image4", "YmU1ZmUzN2IwZTY5ZDE2NTc5NWNmY2Y4ODM3OWNmMGQ+", "YWI1OTVjM2ZmNDQwZjcyZmIxMDljYjE3MGNkZTQ5Mjc+", "ZDYzYWM2ZTdlY2JhMjc5YWJjMzc0MDJmMWY3ZjRmNmI+"];
                $imRandom = rand(0,3);
                $newImage = $images[$imRandom];
            }

           

            $newCharacter = new Character();
            $newCharacter->name = $newName;
            $newCharacter->dataUrl = $newImage;
            $newCharacter->save();
           
        }

        return "success";




    }
}
